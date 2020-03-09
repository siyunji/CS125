import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodSelectPage } from './food-select.page';

describe('FoodSelectPage', () => {
  let component: FoodSelectPage;
  let fixture: ComponentFixture<FoodSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
