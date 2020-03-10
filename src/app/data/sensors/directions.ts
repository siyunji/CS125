import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DirectionReader {
  _url = "http://www.mapquestapi.com/directions/v2/optimizedroute";
  _apikey = "lA4GkGNY9i2AGSWgvyAVyQBuloWvAe2a";

  constructor(private httpClient: HttpClient) {}

  public async getDistance(lat: number, lon: number, fitnessAddr: string) {
    const data = await this.httpClient
      .get(
        `${this._url}?key=${this._apikey}&json={"locations":["${lat},${lon}",${fitnessAddr}]}`
      )
      .toPromise();
      return data["route"]["distance"];
  }
}
