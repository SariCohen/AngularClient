import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingComponent } from './buying.component';

describe('BuyingComponent', () => {
  let component: BuyingComponent;
  let fixture: ComponentFixture<BuyingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyingComponent]
    });
    fixture = TestBed.createComponent(BuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
