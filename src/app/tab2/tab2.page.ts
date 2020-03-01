import { Component } from '@angular/core';
import { Question } from '../data/question';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public questions: Question[] = [];

  constructor() {
    this.questions = [
      {
        question: 'During which time do you want to exercise?',
        answer: ['morning', 'noon', 'night']
      },

      {
        question: 'Do you want to gain muscle or lose weight?',
        answer: ['gain muscle', 'lose weight']
      },

      {
        question: 'How long do you want to exercise?',
        answer: ['30min', '1hour', '1.5hour', '2hour']
      },

      {
        question: 'How much experience do you have?',
        answer: ['Beginner', 'Intermediate', 'Advanced']
      }
    ];
  }

  OnInit() {}
}
