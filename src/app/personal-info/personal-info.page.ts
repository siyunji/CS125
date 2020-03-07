import { GlobalService } from "./../global.service";
import { Tab3PageModule } from "./../tab3/tab3.module";
import { Tab1Page } from "./../tab1/tab1.page";
import { Component, OnInit } from "@angular/core";
import { Question } from "../data/question";
import { Router, NavigationExtras } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { Injectable } from "@angular/core";

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.page.html",
  styleUrls: ["./personal-info.page.scss"]
})

export class PersonalInfoPage implements OnInit {
  public questions: Question[] = [];

  h: any;
  w: any;
  a: any;
  g: any;
  e: any;
  // navigtionExtras: NavigationExtras;
  constructor(
    public global: GlobalService,
    private router: Router,
    public navCtrl: NavController,
    public modalController: ModalController
  ) {
    
 
  }

  ngOnInit() {}

  jumptoHome() {
    console.log(this.h);
    this.global.height = this.h;
    this.global.weight = this.w;
    this.global.age = this.a;
    this.global.gender = this.g;
    this.global.experience = this.e;

    this.navCtrl.navigateForward([
      "tabs",
      {
        //height: this.h,
        weight: this.w,
        age: this.a,
        gender: this.g,
        experience: this.e
      }
    ]);
    // this.navigtionExtras ={state: {height: this.h}};
    // this.router.navigate(['tab3',this.navigtionExtras]);
  }
}
