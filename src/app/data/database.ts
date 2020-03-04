// ../../assets/json/exercise_db.json

declare module "../../assets/json/exercise_db.json";
import * as exercise_db from "../../assets/json/exercise_db.json";

export class ExerciseDB {
  private db: Object;

  public constructor() {
    this.db = exercise_db["default"];
    console.log(
      "Loaded " + Object.keys(this.db).length + " results in exercise_db."
    );
  }
}
