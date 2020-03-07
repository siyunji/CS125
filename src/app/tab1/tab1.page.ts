import { Component, OnInit } from "@angular/core";
import { ExerciseDB } from "../data/database";
import { LocationReader } from "../data/gps";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { WeatherReader } from "../data/weather";
import { Injectable } from '@angular/core';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
@Injectable({
  providedIn: 'root',
})
export class Tab1Page {
  constructor(private weather: WeatherReader) {
    new ExerciseDB();
    new LocationReader(new Geolocation()).getLocation((x: [number, number]) => {
      console.log("GPS");
      console.log(x);
    });
    weather.getWeather();
  }

  OnInit() {}
}
