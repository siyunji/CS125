import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";

export class LocationReader {

  constructor(private geoLocation: Geolocation) {}

  public async getLocation(callback: Function) {
    let options = {
      timeout: 1000
    };
    let self = this;
    this.geoLocation
      .getCurrentPosition(options)
      .then(resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        callback([lat, lng])
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}