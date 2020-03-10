import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocationReader {
  private _geoLocation: Geolocation;

  constructor() {
    this._geoLocation = new Geolocation();
  }

  public async getLocation(): Promise<[number, number]> {
    let options = {
      timeout: 3000
    };
    const resp = await this._geoLocation.getCurrentPosition(options);
    let lat = resp.coords.latitude;
    let lng = resp.coords.longitude;
    return [lat, lng];
  }
}
