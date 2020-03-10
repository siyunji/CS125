import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FoodSelectPage } from "./food-select.page";

const routes: Routes = [
  {
    path: "",
    component: FoodSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodSelectPageRoutingModule {}
