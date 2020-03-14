// ../../assets/json/exercise_db.json

import { Storage } from "@ionic/storage";
import { Exercise } from "./exercise";
import { Food } from "./food";
import { Location } from "./location"

import * as exercise_db from "../../assets/json/exercise_db.json";
import * as food_db from "../../assets/json/food.json";
import * as location_db from "../../assets/json/location.json";

export class Database {
  public constructor(private globalDB: Storage) {}

  public init() {
    this.initExerciseDB();
    this.initFoodDB();
    this.initLocationDB();
  }

  private initExerciseDB() {
    let db = exercise_db["default"];
    console.log(
      "Loaded " + Object.keys(db).length + " results in exercise_db."
    );
    let objDict = new Object();
    Object.keys(db).forEach(key => {
      let e = db[key];
      objDict[key] = new Exercise(
        e["name"],
        e["level"],
        e["type"],
        e["equipment"].split(",")
      );
    });
    this.globalDB.set("ExerciseDB", objDict);
  }

  private initFoodDB() {
    let db = food_db["default"];
    console.log("Loaded " + Object.keys(db).length + " results in food_db.");
    let objDict = new Object();
    Object.keys(db).forEach(key => {
      let e = db[key];
      objDict[key] = new Food(key, e);
    });
    this.globalDB.set("FoodDB", objDict);
  }

  private initLocationDB() {
    let db = location_db["Locations"];
    console.log("Loaded " + Object.keys(db).length + " results in location_db.");
    let objDict = new Object();
    Object.keys(db).forEach(key => {
      let e = db[key];
      objDict[key] = new Location(
        e["Display_name"],
        e["Address"],
        e["Equipment"],
        e["isInDoor"],
        e["Display_time"],
        e["Running_time"]
      );
    });
    this.globalDB.set("LocationDB", objDict);
  }
}
