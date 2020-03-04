import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  height:any;
  weight:any;
  age:any;
  gender:any;
  experience:any;

  constructor(public route: ActivatedRoute,  public navCtrl: NavController) {
    


  }
 


}
