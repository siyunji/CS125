import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';

@Component({
  selector: 'app-food-select',
  templateUrl: './food-select.page.html',
  styleUrls: ['./food-select.page.scss'],
})
export class FoodSelectPage implements OnInit {
  exercise:any; 
  constructor(private route: ActivatedRoute, private router:Router) { 
    this.route.params.subscribe((params: any) => {
      this.exercise = params['exerciseOptions'];
    });
  }

  ngOnInit() {}
  getFeedback(){
    this.router.navigate(['feedback']);
  }
}
