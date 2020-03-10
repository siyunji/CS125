import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodSelectPageRoutingModule } from './food-select-routing.module';

import { FoodSelectPage } from './food-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodSelectPageRoutingModule
  ],
  declarations: [FoodSelectPage]
})
export class FoodSelectPageModule {}
