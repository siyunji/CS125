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
    // private pedometerReader: PedometerReader,
    private globalDB: Storage
  ) {}

  // {Exercise name: array of locations}
  public async recommend(questionMap: Object): Promise<Object[]> {
    let usr = await this.globalDB.get("UserInfo");
    let exercises_db = await this.globalDB.get("ExerciseDB");
    let exercises: Exercise[] = Object.values(exercises_db);
    let locations_db = await this.globalDB.get("LocationDB");
    let locations: Location[] = Object.values(locations_db);

    let weather = "Shower"; // await this.weatherReader.getWeather();
    console.log(weather);

    let dailyConsCal = await this.getDailyConsumedCal(
      usr["gender"],
      usr["weight"],
      usr["height"],
      usr["age"]
    );

    exercises = this.exerciseLevelFilter(exercises, usr["experience"]);

    locations = this.locationWeatherFilter(locations, weather);

    locations = this.locationTimeFilter(
      locations,
      new Date(),
      questionMap["exerciseTime"] * 30
    );
    exercises = this.exerciseEquipmentFilter(locations, exercises);

    this.changeWeight(["Incline Hammer Curls"], "Incline Hammer Curls");

    exercises.sort(
      (exercise: Exercise) => -(exercise as any)._preferenceWeight
    );

    locations = await this.sortLocation(locations);

    let res: Object[];
    res = [];

    console.log(locations);

    for (let e of exercises.slice(0, 5)) {
      let o = new Object();

      console.log(e);
      console.log(this.locationEquipmentFilter(locations, e));

      o[(e as any)._name] = this.locationEquipmentFilter(locations, e);
      res.push(o);
    }

    return res;

    /*
    let calConsByExe = this.getCalConsByExe(
      usr["weight"],
      questionMap["exerciseType"],
      questionMap["exerciseTime"]
    );
*/
  }

  public changeWeight(options: string[], chosen: string): void {
    this.globalDB.get("ExerciseDB").then(exercise_dict => {
      for (let i = 0; i < options.length; i++) {
        if (options[i] == chosen) {
          Exercise.addPreferenceWeight(exercise_dict[options[i]]);
        } else {
          Exercise.subPreferenceWeight(exercise_dict[options[i]]);
        }
      }
      this.globalDB.set("ExerciseDB", exercise_dict);
    });
  }

  // assume weight has the unit pound
  // assume exerciseTime is multiple of 30mins. e.g, 1.5hr => exerciseTime = 3
  // For simplication, calorie consumption is calculated under gerneralized circunmstances.
  private getCalConsByExe(
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
      res = [];

      for (let i = 0; i < locations.length; i++) {
        if ((locations[i] as any)._isInDoor) {
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
  ): Location[] {
    let endDate = new Date(currDate);
    endDate.setMinutes(endDate.getMinutes() + workoutTime + 30); // End time should be 30 min earlier than closing time.
    let res: Location[];
    res = [];
    for (let i = 0; i < locations.length; i++) {
      // If the location opens now and then, choose it
      if (
        Location.isOpen(locations[i], currDate.getDay(), currDate.getHours()) &&
        Location.isOpen(locations[i], endDate.getDay(), endDate.getHours())
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
      for (let j = 0; j < (locations[i] as any)._equipment.length; j++) {
        equipments.add((locations[i] as any)._equipment[j]);
      }
    }

    // if all of the equipments that an exercise need is in the set, choose it
    let res: Exercise[];
    res = [];
    for (let i = 0; i < exercises.length; i++) {
      let choose_flag = true;
      for (let j = 0; j < (exercises[i] as any)._equipment.length; j++) {
        if (!equipments.has((exercises[i] as any)._equipment[j])) {
          choose_flag = false;
        }
      }
      if (choose_flag) {
        res.push(exercises[i]);
      }
    }

    return res;
  }

  private exerciseLevelFilter(exercises: Exercise[], level: String) {
    let res: Exercise[];
    res = [];
    for (let i = 0; i < exercises.length; i++) {
      if ((exercises[i] as any)._difficulty == level) {
        res.push(exercises[i] as Exercise);
      }
    }
    return res;
  }

  private locationEquipmentFilter(locations: Location[], exercise: Exercise) {
    let res: Location[] = [];
    for (let l of locations) {
      if ((l as any)._equipment.includes((exercise as any)._equipment[0])) {
        res.push(l);
      }
    }
    return res;
  }

  private async sortLocation(locations: Location[]): Promise<Location[]> {
    //let data = await this.locationReader.getLocation();
    //let currentLat: number = data[0];
    //let currentLng: number = data[1];

    for (let i = 0; i < locations.length; i++) {
      let loc = locations[i];
      let addr = (loc as any)._address;
      /*
      data = await this.directionReader.getDistance(
        currentLat,
        currentLng,
        addr
      );
      (loc as any)._distance = data;
      */
    }

    locations.sort(location => (location as any)._distance);
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
  private async getDailyConsumedCal(
    gender: string,
    weight: number,
    height: number,
    age: number
  ): Promise<number> {
    //const calConsByWalk = await this.getCalConsumedByWalk();
    let calConsByWalk = 0; // ...
    let activityLevel = 1.2;
    let BMRForMale = 66 + 6.2 * weight + 12.7 * height - 6.76 * age;
    let BMRForFemale = 655.1 + 4.35 * weight + 4.7 * height - 4.7 * age;
    let BMR = 0;
    if (gender == "male") {
      BMR = BMRForMale;
    } else if (gender == "female") {
      BMR = BMRForFemale;
    } else {
      // gender is other / prefer not to say
      BMR = (BMRForMale + BMRForFemale) / 2;
    }
    return BMR * activityLevel + calConsByWalk;
  }
  /*
  private async getCalConsumedByWalk(): Promise<number> {
    let userInfo = await this.globalDB.get("UserInfo");
    let step = await this.pedometerReader.readStepCount();
    return (userInfo["weight"] / 2000) * step;
  }
*/
  private foodFilter(cal: number): [] {
    return []; // ..
  }
}
