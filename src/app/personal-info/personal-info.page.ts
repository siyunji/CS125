import { Tab1Page } from './../tab1/tab1.page';
import { Component, OnInit } from '@angular/core';
import { Question } from '../data/question';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  
  public questions: Question[] = [];
  h:any;
  w:any;
  a:any;
  g:any;
  e:any;
  constructor(private router: Router, public navCtrl: NavController) {
   }

  ngOnInit() {
  }

  jumptoHome() {
   
    this.navCtrl.navigateForward(['tabs',{ height: this.h, weight:this.w, age:this.a, gender: this.g, experience:this.e}]);
    
  }

 

}
