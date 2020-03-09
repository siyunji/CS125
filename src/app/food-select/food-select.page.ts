import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-food-select',
  templateUrl: './food-select.page.html',
  styleUrls: ['./food-select.page.scss'],
})
export class FoodSelectPage implements OnInit {
  exercise:any; 
  constructor(public navCtrl: NavController) { 
    this.exercise = ["running", "jogging","swimming","jumping"];
  }

  ngOnInit() {}
  getFeedback(){
    this.navCtrl.navigateForward(['feedback']);
  }
}
