import { Component, Input } from '@angular/core';
import { Question } from '../data/question';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  public questions: Question[] = [];
  //hh:any;
  //@Input() h:string; 
  constructor(private router: Router, public navCtrl: NavController) {
    //this.hh = NavParams.get('h');
    this.questions = [
      {
        question: 'During which time do you want to exercise?',
        answer: ['Morning', 'Noon', 'Night']
      },

      {
        question: 'Do you want to gain muscle or lose weight?',
        answer: ['Gain muscle', 'Lose weight']
      },

      {
        question: 'How long do you want to exercise?',
        answer: ['30mins', '1hour', '1.5hours', '2hours']
      },
      {
        question: 'How much experience do you have?',
        answer: ['Beginner', 'Intermediate', 'Advanced']
      },
      {
        question: 'How many times do you currently do exercise?',
        answer: ['never', '1-2 times a week', '3-4 times a week', '5+ times a week']
      },
      {
        question: 'How many times a week do you want to work out?',
        answer: ['2 times a week', '3 times a week', '4 times a week', '5 times a week', '6 times a week', 'Every day']
      },
      {
        question: 'Which specific day do you want to work out?',
        answer: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      {
        question: 'How much experience do you have?',
        answer: ['Beginner', 'Intermediate', 'Advanced']
      },
      {
        question: 'How much experience do you have?',
        answer: ['Beginner', 'Intermediate', 'Advanced']
      },
      {
        question: 'How much experience do you have?',
        answer: ['Beginner', 'Intermediate', 'Advanced']
      },
      {
        question: 'How much experience do you have?',
        answer: ['Beginner', 'Intermediate', 'Advanced']
      }
    ];
  }

  OnInit() {}

  recommedation(){
    //this.router.navigate(['recommedation']
    this.navCtrl.navigateForward(['recommedation']);

  }
}
