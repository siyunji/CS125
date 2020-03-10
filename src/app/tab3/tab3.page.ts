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
    globalDB.get("UserInfo").then(userInfo => {
      this.weight = userInfo["weight"];
      this.height = userInfo["height"];
      this.age = userInfo["age"];
      this.gender = userInfo["gender"];
      this.experience = userInfo["experience"];
    });
  }
}
