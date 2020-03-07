import { LocationReader } from "../data/gps";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { WeatherReader } from "../data/weather";
import { DirectionReader } from "../data/directions";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController} from '@ionic/angular';
import { GlobalService } from "./../global.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
@Injectable({
  providedIn: "root"
})
export class Tab1Page {
  bmi: any;
  bmiResult: any;
  constructor(public route: ActivatedRoute, public navCtrl: NavController, public global: GlobalService, direction: DirectionReader,
    weather: WeatherReader, private globalDB: Storage) {
    this.bmi = (this.global.weight / (this.global.height/100 * this.global.height/100)).toFixed(2);
    this.calBMI();
    
  }

  OnInit() {}

  calBMI(){
    if(this.bmi <= 18.5 ){
      this.bmiResult =  "Under weight. To keep healthy, you need to gain more muscle.";
    }
    if(this.bmi > 18.5 && this.bmi < 24.9 ){
      this.bmiResult  = "Normal weight. You are healthy, keep going!";
    }
    if(this.bmi > 25 ){
      this.bmiResult  = "Overweight. To keep healthy, you need to lose weight.";
    }
  }
  start(){
    this.navCtrl.navigateForward(['tab2']);
  }
}
