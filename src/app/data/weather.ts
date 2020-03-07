import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WeatherReader {
    _url = "http://dataservice.accuweather.com/currentconditions/v1";
    _locationKey = "337095";
    _apikey = "a4kr4QitOCjTJArT91dGAtrNcNXEOqhB";

    constructor (private httpClient: HttpClient) {}

    public getWeather() {
        this.httpClient.get(`${this._url}/${this._locationKey}?apikey=${this._apikey}&details=true`).subscribe(
            (data) => {
                console.log("weather");
                console.log(data[0]["WeatherText"]);
            }
        )
    }
}
