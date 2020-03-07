import { Tab1Page } from "./../tab1/tab1.page";
import { Component, OnInit, Injectable } from "@angular/core";
import { Question } from "../data/question";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Database } from "../data/database";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.page.html",
  styleUrls: ["./personal-info.page.scss"]
})
@Injectable({
  providedIn: "root"
})
export class PersonalInfoPage implements OnInit {
  public questions: Question[] = [];
  h: any;
  w: any;
  a: any;
  g: any;
  e: any;

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private globalDB: Storage
  ) {
    // if not first time, jump to home
    globalDB.get("first_time_use").then(x => {
      if (x === false) {
        this.jumptoHome();
      }
    });
    globalDB.set("first_time_use", false);

    new Database(globalDB).init();
  }

  ngOnInit() {}

  public submitBtnOnClick() {
    // TODO: load personal info to db
    this.jumptoHome();
  }

  jumptoHome() {
    this.navCtrl.navigateForward([
      "tabs",
      {
        height: this.h,
        weight: this.w,
        age: this.a,
        gender: this.g,
        experience: this.e
      }
    ]);
  }
}
