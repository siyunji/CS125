import { Pedometer } from "@ionic-native/pedometer/ngx";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PedometerReader {
  constructor(private pedometer: Pedometer) {}

  public async readStepCount(): Promise<number> {
    // debug
    // this.pedometer
    //   .isDistanceAvailable()
    //   .then((available: boolean) => console.log(available))
    //   .catch((error: any) => console.log(error));

    const data = await this.pedometer.startPedometerUpdates().toPromise();
    return data.numberOfSteps;
  }
}
