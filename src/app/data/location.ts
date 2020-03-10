export class Location {
  private _name: string;
  private _address: string;
  private _isInDoor: boolean;
  private _equipment: string[];
  private _runningTime: number[];
  private _displayTime: string[];
  private _distance: number;

  public constructor(
    name: string,
    address: string,
    equipment: string[],
    isInDoor: boolean,
    displayTime: string[],
    runningTime: number[]
  ) {
    this._name = name;
    this._address = address;
    this._isInDoor = isInDoor;
    this._equipment = equipment;
    this._runningTime = runningTime;
    this._displayTime = displayTime;
    this._distance = -1;
  }

  public get name() {
    return this._name;
  }

  public get address() {
    return this._address;
  }

  public get isInDoor() {
    return this._isInDoor;
  }

  public get equipment() {
    return this._equipment;
  }

  public get displayTime() {
    return this._displayTime;
  }

  public get distance() {
    return this._distance;
  }

  public set distance(value: number) {
    this._distance = value;
  }

  public isOpen(weekday: number, hour: number): boolean {
    return ((this._runningTime[weekday] >> hour) & 1) == 1;
  }
}
