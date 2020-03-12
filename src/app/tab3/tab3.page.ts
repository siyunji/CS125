import { Component, Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
@Injectable({
  providedIn: "root"
})
export class Tab3Page {
  private weight: any;
  private height: any;
  private age: any;
  private gender: any;
  private experience: any;

  constructor(private globalDB: Storage) {
    let self = this;
    this.globalDB.get("UserInfo").then(userInfo => {
      self.weight = userInfo["weight"];
      self.height = userInfo["height"];
      self.age = userInfo["age"];
      self.gender = userInfo["gender"];
      self.experience = userInfo["experience"];
    });
  }

  ngOnInit() {
   
  }
}
