import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recommedation',
  templateUrl: './recommedation.page.html',
  styleUrls: ['./recommedation.page.scss'],
})
export class RecommedationPage implements OnInit {
  food = [];
  selection: any;
 // exercise = [];
  constructor(public navCtrl: NavController) { 
    this.food = ["chicken", "salad","fish"];
    
  }

  ngOnInit() {
  }

  foodSelect(){
    this.navCtrl.navigateForward(['food-select']);
    console.log(this.selection);
  }

}
