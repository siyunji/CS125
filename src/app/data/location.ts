export class Location {
  private _name: string;
  private _address: [number, number];
  private _isInDoor: boolean;
  private _equipment: string[];

  public constructor(
    name: string,
    address: [number, number],
    isInDoor: boolean,
    equipment: string[]
  ) {
    this._name = name;
    this._address = address;
    this._isInDoor = isInDoor;
    this._equipment = equipment;
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
}