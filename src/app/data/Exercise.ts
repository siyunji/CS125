export class Exercise {
  private _name: string;
  private _difficulty: string;
  private _type: string;
  private _equipment: [string];
  private _preferenceWeight: number;

  public constructor(
    name: string,
    difficulty: string,
    type: string,
    equipment: [string]
  ) {
    this._name = name;
    this._difficulty = difficulty;
    this._type = type;
    this._equipment = equipment;
    this._preferenceWeight = 0;
  }

  public get name() {
      return this._name;
  }

  public get difficulty() {
      return this._difficulty;
  }

  public get type() {
      return this._type;
  }

  public get equipment() {
      return this._equipment;
  }

  public get preferenceWeight() {
      return this._preferenceWeight;
  }

  public addPreferenceWeight() {
      this._preferenceWeight += 1;
  }

  public subPreferenceWeight() {
      this._preferenceWeight -= 0.25;
  }
}
