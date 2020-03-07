import { Component, OnInit } from "@angular/core";
import { LocationReader } from "../data/gps";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { WeatherReader } from "../data/weather";
import { DirectionReader } from "../data/directions";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
@Injectable({
  providedIn: "root"
})
export class Tab1Page {
  constructor(
    direction: DirectionReader,
    weather: WeatherReader,
    private globalDB: Storage
  ) {
    //   globalDB.get("ExerciseDB").then(x => {
    //     console.log(x);
    //   });
    //   globalDB.get("first_time_use").then(x => {
    //     console.log(x);
    //   });
    //   new LocationReader(new Geolocation()).getLocation((x: [number, number]) => {
    //     console.log("GPS");
    //     console.log(x);
    //   });
    //weather.getWeather();
    // direction.getDirection(39.750307, -104.999472, "Boulder, CO");
  }

  OnInit() {}
}
