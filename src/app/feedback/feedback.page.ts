import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.page.html",
  styleUrls: ["./feedback.page.scss"]
})
export class FeedbackPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  backToHome() {
    this.navCtrl.navigateForward(["tabs"]);
  }
}
