import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentsComponent } from './presents.component';

describe('PresentsComponent', () => {
  let component: PresentsComponent;
  let fixture: ComponentFixture<PresentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentsComponent]
    });
    fixture = TestBed.createComponent(PresentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
