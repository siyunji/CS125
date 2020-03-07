export class Food {
    private _name: string;
    private _calories: number;

    public constructor (
        name: string,
        calories: number
    ) {
        this._name = name;
        this._calories = calories;
    }

    public get name() {
        return this._name;
    }

    public get calories() {
        return this._calories;
    }
}