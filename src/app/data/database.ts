// ../../assets/json/exercise_db.json

import { Storage } from "@ionic/storage";
import { Exercise } from "./exercise";
import { Food } from "./food";

import * as exercise_db from "../../assets/json/exercise_db.json";
import * as food_db from "../../assets/json/food.json";

export class Database {
  public constructor(private globalDB: Storage) {}

  public init() {
    this.initExerciseDB();
    this.initFoodDB();
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
    console.log("Exercise DB init done.");
  }

  private initFoodDB() {
    let db = food_db["default"];
    console.log("Loaded " + Object.keys(db).length + " results in food_db.");
    let objDict = new Object();
    Object.keys(db).forEach(key => {
      let e = db[key];
      objDict[key] = new Food(key, e["default"]);
    });
  }

  private initLocationDB() {
    
  }
}
