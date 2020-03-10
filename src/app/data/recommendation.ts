import { Location } from "./location";
import { Exercise } from "./exercise";

import { LocationReader } from "./sensors/gps";
import { DirectionReader } from "./sensors/directions";
import { WeatherReader } from "./sensors/weather";
import { PedometerReader } from "./sensors/pedometer";

import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

export enum Goal {
  GainMuscle = 0,
  LoseWeight = 1
}

@Injectable({
  providedIn: "root"
})
export class Recommendation {
  public constructor(
    private locationReader: LocationReader,
    private directionReader: DirectionReader,
    private weatherReader: WeatherReader,
    private pedometerReader: PedometerReader,
    private globalDB: Storage
  ) {}

  // calConsByExe is the return value of calculateCalorieConsumption
  public recommend(calConsByExe: number) {
    
    // let dailyConsCal = this.getDailyConsumedCal();
    // ...
  }

  // assume weight has the unit pound
  // assume exerciseTime is multiple of 30mins. e.g, 1.5hr => exerciseTime = 3
  // For simplication, calorie consumption is calculated under gerneralized circunmstances.
  public calculateCalorieConsumption(
    weight: number,
    exerciseType: Goal,
    exerciseTime: number
  ) {
    // calorieCount is on the basis of 30min.
    // Reference: https://www.health.harvard.edu/diet-and-weight-loss/calories-burned-in-30-minutes-of-leisure-and-routine-activities
    let calorieCount: number;
    if (exerciseType == Goal.GainMuscle) {
      // assume to lift weight
      if (weight <= 125) calorieCount = 120;
      else if (weight > 125 && weight <= 145) calorieCount = 180;
      else if (weight > 145 && weight <= 175) calorieCount = 223;
      else calorieCount = 266; // weight > 175
    } else if (exerciseType == Goal.LoseWeight) {
      // assume to run in the speed of 5mph
      if (weight <= 125) calorieCount = 180;
      else if (weight > 125 && weight <= 145) calorieCount = 240;
      else if (weight > 145 && weight <= 175) calorieCount = 298;
      else calorieCount = 355; // weight > 175
    }
    return calorieCount * exerciseTime;
  }

  public changeWeight(options: string[], chosen: string): void {
    this.globalDB.get("ExerciseDB").then(exercise_dict => {
      for (let i = 0; i < options.length; i++) {
        if (options[i] == chosen) {
          exercise_dict[options[i]].addPreferenceWeight();
        } else {
          exercise_dict[options[i]].subPreferenceWeight();
        }
      }
      this.globalDB.set("ExerciseDB", exercise_dict);
    });
  }

  private locationWeatherFilter(
    locations: Location[],
    weather: string
  ): Location[] {
    let goodWeather: string[] = [
      "Sunny",
      "Partly Sunny",
      "Cloudy",
      "Partly Cloudy"
    ];

    if (!goodWeather.includes(weather)) {
      // if weather is bad
      let res: Location[];
      for (let i = 0; i < locations.length; i++) {
        if (locations[i].isInDoor) {
          res.push(locations[i]); // choose only indoor locations
        }
      }
      return res;
    }

    return locations; // choose all
  }

  private locationTimeFilter(
    locations: Location[],
    currDate: Date,
    workoutTime: number
  ) {
    let endDate = new Date(currDate);
    endDate.setMinutes(endDate.getMinutes() + workoutTime + 30); // End time should be 30 min earlier than closing time.
    let res: Location[];
    for (let i = 0; i < locations.length; i++) {
      // If the location opens now and then, choose it
      if (
        locations[i].isOpen(currDate.getDay(), currDate.getHours()) &&
        locations[i].isOpen(endDate.getDay(), endDate.getHours())
      ) {
        res.push(locations[i]);
      }
    }
    return res;
  }

  private exerciseEquipmentFilter(
    locations: Location[],
    exercises: Exercise[]
  ): Exercise[] {
    // pull set of available equipments
    let equipments = new Set();
    for (let i = 0; i < locations.length; i++) {
      for (let j = 0; j < locations[i].equipment.length; j++) {
        equipments.add(locations[i].equipment[j]);
      }
    }

    // if all of the equipments that an exercise need is in the set, choose it
    let res: Exercise[];
    for (let i = 0; i < exercises.length; i++) {
      let choose_flag = true;
      for (let j = 0; j < exercises[i].equipment.length; j++) {
        if (!equipments.has(exercises[i].equipment[j])) {
          choose_flag = false;
        }
      }
      if (choose_flag) {
        res.push(exercises[i]);
      }
    }

    return res;
  }

  private sortLocation(locations: Location[]): Location[] {
    let currentLat: number;
    let currentLng: number;

    this.locationReader.getLocation().then(data => {
      currentLat = data[0];
      currentLng = data[1];
    });

    for (let i = 0; i < locations.length; i++) {
      let loc = locations[i];
      let addr = loc.address;
      this.directionReader
        .getDistance(currentLat, currentLng, addr)
        .then(data => {
          loc.distance = data;
        });
    }

    locations.sort(location => location.distance);
    return locations;
  }

  // Reference: https://www.healthline.com/health/fitness-exercise/how-many-calories-do-i-burn-a-day#harrisbenedict-formula
  // As stated in the website, we pick 1.2 as the Activity Level, calculating the daily calories burned
  // if someone is mainly sedentary. We add the result with calories consumed by walking (see the
  // function below), and finally we can get a person's daily consumed calories.
  //
  // Kinds of genders: male / female / other / prefer not to say
  // Formula:
  // - BMR for male: 66 + (6.2 x weight) + (12.7 x height) - (6.76 x age)
  // - BMR for female: 655.1 + (4.35 x weight) + (4.7 x height) - (4.7 x age)
  // - BMR for other / prefer not to say: calculate the mean of the above two formulas
  // - The daily calorie consumed is BMR * Activity Level
  private getDailyConsumedCal(
    gender: string, 
    weight: number, 
    height: number, 
    age: number
    ): Promise<number> {
    return this.getCalConsumedByWalk().then(calConsByWalk => {
      let activityLevel = 1.2;
      let BMRForMale = (66 + (6.2 * weight) + (12.7 * height) - (6.76 * age));
      let BMRForFemale = (655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age));
      let BMR = 0;

      if (gender == "male") {
        BMR = BMRForMale;
      }
      else if (gender == "female") {
        BMR = BMRForFemale;
      }
      else { // gender is other / prefer not to say
        BMR = (BMRForMale + BMRForFemale) / 2;
      }
      return BMR * activityLevel + calConsByWalk;
    })
  }

  private async getCalConsumedByWalk(): Promise<number> {
    let step = await this.pedometerReader.readStepCount();
    let usrWeight = 70; // Dummy Here
    let cal = usrWeight / 2000 * step;
    return cal;
  }
}
