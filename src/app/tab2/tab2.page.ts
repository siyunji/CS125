import { Component, Input, Injectable } from "@angular/core";
import { Question } from "../data/question";
import { Router } from "@angular/router";
import { Recommendation, Goal } from "../data/recommendation";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
@Injectable({
  providedIn: "root"
})
export class Tab2Page {
  public questions: Question[] = [];
  //hh:any;
  //@Input() h:string;
  selection: any;
  select_list = [];
  private questionMap: Object;

  constructor(private router: Router, private recommendation: Recommendation) {
    this.questionMap = new Object();
    
    this.questions = [
      {
        question: "During which time do you want to exercise?",
        answer: { Morning: null, Noon: null, Night: null },
        key: "exercisePeriod"
      },
      {
        question: "Do you want to gain muscle or lose weight?",
        answer: {
          "Gain muscle": Goal.GainMuscle,
          "Lose weight": Goal.LoseWeight
        },
        key: "exerciseType"
      },
      {
        question: "How long do you want to exercise?",
        answer: { "30 mins": 1, "1 hour": 2, "1.5 hours": 3, "2 hours": 4 },
        key: "exerciseTime"
      },
      // duplicated with the user model
      // {
      //   question: "How much experience do you have?",
      //   answer: {"Beginner", "Intermediate", "Expert"},
      //   key: "experienceLevel"
      // },
      {
        question: "How many times do you currently do exercise?",
        answer: {
          Never: null,
          "1-2 times a week": null,
          "3-4 times a week": null,
          "5+ times a week": null
        },
        key: "exerciseFreq"
      },
      {
        question: "How many times a week do you want to work out?",
        answer: {
          "2 times a week": null,
          "3 times a week": null,
          "4 times a week": null,
          "5 times a week": null,
          "6 times a week": null,
          "Every day": null
        },
        key: "exerciseFreqWeekly"
      }
    ];
  }

  OnInit() {}

  /*
  async getItemitem(item, event) {
    
    let userInfo = await this.globalDB.get("UserInfo");
    userInfo["exerciseTime"]
    
    this.questionMap[item["key"]] = null;
    console.log(this.questionMap);
  }
  */

  storeValue(item, value) {
    this.questionMap[item["key"]] = value;
  }

  btnOnClick() {
    this.recommendation.recommend(this.questionMap).then(exerciseOptions => {
      this.router.navigate(["food-select", exerciseOptions]);
    });
  }
}
