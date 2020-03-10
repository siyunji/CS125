import { Component, Input } from '@angular/core';
import { Question } from '../data/question';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  public questions: Question[] = [];
  //hh:any;
  //@Input() h:string; 
  selection:any;
  select_list = [];
  constructor(private router: Router, public navCtrl: NavController) {
    //this.hh = NavParams.get('h');
    this.questions = [
      {
        question: 'During which time do you want to exercise?',
        answer: ['Morning', 'Noon', 'Night'],
        key: 'time',
      },

      {
        question: 'Do you want to gain muscle or lose weight?',
        answer: ['Gain muscle', 'Lose weight'],
        key: 'muscle',
      },

      {
        question: 'How long do you want to exercise?',
        answer: ['30 mins', '1 hour', '1.5 hours', '2 hours'],
        key: 'muscle',
      },
      {
        question: 'How much experience do you have?',
        answer: ['Beginner', 'Intermediate', 'Advanced'],
        key: 'muscle'
      },
      {
        question: 'How many times do you currently do exercise?',
        answer: ['Never', '1-2 times a week', '3-4 times a week', '5+ times a week'],
        key: 'muscle',
      },
      {
        question: 'How many times a week do you want to work out?',
        answer: ['2 times a week', '3 times a week', '4 times a week', '5 times a week', '6 times a week', 'Every day'],
        key: 'muscle',
      }
      
    ];
  }

  OnInit() {}

  recommedation(){
    //this.router.navigate(['recommedation']
    this.navCtrl.navigateForward(['recommedation']);
    console.log(this.selection);
  }
}
