import { Component, OnInit } from '@angular/core';
import { Question } from '../data/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  public questions: Question[] = [];
  constructor(private router: Router) {
    this.questions = [
      {
        question: 'Height:',
        answer: []
      },

      {
        question: 'Weight:',
        answer: []
      },

      {
        question: 'Age:',
        answer: []
      },
      {
        question: 'Gender:',
        answer: []
      }

    ];
   }

  ngOnInit() {
  }
  jumptoHome(){
    this.router.navigate(['tabs']);
  }

}
