import { Component, OnInit } from "@angular/core";
import { ExerciseDB } from "../data/database";
import { LocationReader } from "../data/gps";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor() {
    new ExerciseDB();
    new LocationReader(new Geolocation()).getLocation((x: [number, number]) => {
      console.log("GPS");
      console.log(x);
    });
  }

  OnInit() {}
}
