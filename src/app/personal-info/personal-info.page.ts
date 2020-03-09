import { GlobalService } from "./../global.service";
import { Tab3PageModule } from "./../tab3/tab3.module";
import { Tab1Page } from "./../tab1/tab1.page";
import { Component, OnInit } from "@angular/core";
import { Question } from "../data/question";
import { Router, NavigationExtras } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Database } from "../data/database";

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
    private globalDB: Storage,
    public modalController: ModalController,
    public global: GlobalService
  ) {
    // if not first time, jump to home
    /*
    globalDB.get("first_time_use").then(x => {
      if (x === false) {
        this.jumptoHome();
      }
    });
    globalDB.set("first_time_use", false);

    new Database(globalDB).init();
    */
  }

  ngOnInit() {}

  public submitBtnOnClick() {
    // TODO: load personal info to db
    this.jumptoHome();
  }

  jumptoHome() {
    this.global.height = this.h;
    this.global.weight = this.w;
    this.global.age = this.a;
    this.global.gender = this.g;
    this.global.experience = this.e;
    this.navCtrl.navigateForward(["tabs"]);
  }
}
