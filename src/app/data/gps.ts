import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";

export class LocationReader {
    private _latitue: any;
    private _longitude: any;
    constructor (private geoLocation: Geolocation) {
        let options = {
            timeout: 1000
        };
        let self = this;
        this.geoLocation.getCurrentPosition(options).then((resp) => {
            self._latitue = resp.coords.latitude;
            self._longitude = resp.coords.longitude;
        }).catch((error) => {
            console.log("Error getting location", error);
        });
    }

    public getLocation() {
        return [this._latitue, this._longitude];
    }
}

/*
export class LocationReader {
  private _geoLocation: Geolocation;
  constructor(geoLocation: Geolocation) {
    this._geoLocation = geoLocation;
    console.log("GPS");
  }

  public getLocation() {
    let options = {
      timeout: 1000
    };
    return this._geoLocation
      .getCurrentPosition(options)
      .then(resp => {
        return [resp.coords.latitude, resp.coords.longitude];
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
*/
