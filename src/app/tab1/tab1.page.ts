import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { GlobalService } from "./../global.service";
import { Pedometer } from "@ionic-native/pedometer/ngx";

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
  constructor(
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public global: GlobalService,
    private globalDB: Storage
  ) {
    globalDB.get("UserInfo").then(userInfo => {
      this.bmi = (
        703 * userInfo["weight"] /
        (((userInfo["height"]) * userInfo["height"]))
      ).toFixed(2);
      this.calBMI();
    });
  }

  OnInit() {}

  calBMI() {
    if (this.bmi <= 18.5) {
      this.bmiResult =
        "Under weight. To keep healthy, you need to gain more muscle.";
    }
    if (this.bmi > 18.5 && this.bmi < 24.9) {
      this.bmiResult = "Normal weight. You are healthy, keep going!";
    }
    if (this.bmi > 25) {
      this.bmiResult = "Overweight. To keep healthy, you need to lose weight.";
    }
  }
  start() {
    this.navCtrl.navigateForward(["tabs/tab2"]);
  }
}
