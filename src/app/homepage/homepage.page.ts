import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.page.html",
  styleUrls: ["./homepage.page.scss"]
})
export class HomepagePage implements OnInit {
  constructor(private router: Router, private globalDB: Storage) {}

  ngOnInit() {}

  start() {
    this.globalDB.get("FirstTimeUse").then(ftu => {
      if (ftu === false) {
        this.router.navigate(["tabs"]);
      } else {
        this.router.navigate(["personal-info"]);
      }
    });
  }
}
