import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.page.html",
  styleUrls: ["./feedback.page.scss"]
})
export class FeedbackPage implements OnInit {
  text: string[];
  food: string[];
  constructor(private navCtrl: NavController, private route: ActivatedRoute) {
    this.text = [];
    this.food = [];
    this.route.params.subscribe((params: any) => {
      let recom = JSON.parse(params[0]);
      this.food = JSON.parse(params[1]);
      
      console.log("feedback food");
      console.log(this.food);
      this.text.push(Object.keys(recom)[0]);

      this.text.push("\nYou can do it at:\n");

      let locations = [];
      for (let l of recom[Object.keys(recom)[0]]) {
        console.log((l as any)._name);
        this.text.push((l as any)._name);
      }

    });
  }

  ngOnInit() {}

  backToHome() {
    this.navCtrl.navigateForward(["tabs"]);
  }
}
