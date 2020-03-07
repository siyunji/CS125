import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recommedation',
  templateUrl: './recommedation.page.html',
  styleUrls: ['./recommedation.page.scss'],
})
export class RecommedationPage implements OnInit {
  food = [];
  exercise = [];
  constructor(public navCtrl: NavController) { 
    this.food = ["chicken", "salad","fish"];
    this.exercise = ["running", "jogging","swimming","jumping"];
  }

  ngOnInit() {
  }

  getFeedback(){
    this.navCtrl.navigateForward(['feedback']);
  }

}
