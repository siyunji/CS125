import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-food-select",
  templateUrl: "./food-select.page.html",
  styleUrls: ["./food-select.page.scss"]
})
export class FoodSelectPage implements OnInit {
  exercise: any;
  recom: any;
  food :any;
  exe:any;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params: any) => {
      this.recom = JSON.parse(params[0]);
      this.food = JSON.parse(params[1]);
      console.log(this.recom);
      
      let exerciseRecom = [];
      for (let i of this.recom) {
        exerciseRecom.push(Object.keys(i));
      }
      this.exercise = exerciseRecom;
    });
  }

  ngOnInit() {}

  selectExercise(e){
    for(let i of this.recom){
      if(Object.keys(i)[0] == e[0]){
        console.log(i);
        console.log("select exercise food");
        console.log(this.food);
        this.router.navigate(["feedback", [JSON.stringify(i), JSON.stringify(this.food)]]);
        return;
      }
    }
  }

 
}
