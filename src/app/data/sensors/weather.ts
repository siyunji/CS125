import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class WeatherReader {
  _url = "http://dataservice.accuweather.com/currentconditions/v1";
  _locationKey = "337095";
  _apikey = "a4kr4QitOCjTJArT91dGAtrNcNXEOqhB";

  constructor(private httpClient: HttpClient) {}

  public async getWeather(): Promise<string> {
    const data = await this.httpClient
      .get(
        `${this._url}/${this._locationKey}?apikey=${this._apikey}&details=true`
      )
      .toPromise();
    return data[0]["WeatherText"];
  }
}
