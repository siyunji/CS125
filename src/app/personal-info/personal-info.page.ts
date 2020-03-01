import { Component, OnInit } from '@angular/core';
import { Question } from '../data/question';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  public questions: Question[] = [];
  constructor() {
    this.questions = [
      {
        question: 'what is your height?',
        answer: []
      },

      {
        question: 'What is your weight',
        answer: []
      },

      {
        question: 'What is your age?',
        answer: []
      },

      {
        question: 'How much experience do you have?',
        answer: []
      },

      {
        question: '',
        answer: []
      }
    ];
   }

  ngOnInit() {
  }
  

}
