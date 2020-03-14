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
    public navCtrl: NavController,
    private globalDB: Storage,
    public modalController: ModalController
  ) {
    new Database(this.globalDB).init();
  }

  ngOnInit() {}
  
  public async submitBtnOnClick() {
    let userInfo = new Object();
    userInfo["height"] = this.h;
    userInfo["weight"] = this.w;
    userInfo["age"] = this.a;
    userInfo["gender"] = this.g;
    userInfo["experience"] = this.e;

    await this.globalDB.set("UserInfo", userInfo);
    await this.globalDB.set("FirstTimeUse", false);
    this.navCtrl.navigateForward(["tabs"]);
  }
}
