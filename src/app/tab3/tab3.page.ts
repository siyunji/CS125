import { Component, Input } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { Injectable } from "@angular/core";
import { GlobalService } from "./../global.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public global: GlobalService
  ) {
    // this.hh = NavParams.get('h');
    // this.route.queryParams.subscribe(params => this.height = this.router.getCurrentNavigation().extras.state);
    /*
    this.height = this.route.snapshot.paramMap.get("height");
    this.weight = this.route.snapshot.paramMap.get("weight");
    this.age = this.route.snapshot.paramMap.get("age");
    this.gender = this.route.snapshot.paramMap.get("gender");
    this.experience = this.route.snapshot.paramMap.get("experience");
    */
  }
}
