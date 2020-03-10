import { Pedometer } from "@ionic-native/pedometer/ngx";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PedometerReader {
  private _pedometer = new Pedometer();
  constructor() {}

  public async readStepCount(): Promise<number> {
    // debug
    // this.pedometer
    //   .isDistanceAvailable()
    //   .then((available: boolean) => console.log(available))
    //   .catch((error: any) => console.log(error));

    const data = await this._pedometer.startPedometerUpdates().toPromise();
    return data.numberOfSteps;
  }
}
