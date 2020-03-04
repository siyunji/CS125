import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  height:any;
  weight:any;
  age:any;
  gender:any;
  experience:any;

  constructor(public route: ActivatedRoute) {

    this.height = this.route.snapshot.paramMap.get("height");
    this.weight = this.route.snapshot.paramMap.get("weight");
    this.age = this.route.snapshot.paramMap.get("age");
    this.gender = this.route.snapshot.paramMap.get("gender");
    this.experience = this.route.snapshot.paramMap.get("experience");
  
  }
    
    

}
