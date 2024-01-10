import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NisuaimComponent } from './nisuaim.component';

describe('NisuaimComponent', () => {
  let component: NisuaimComponent;
  let fixture: ComponentFixture<NisuaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NisuaimComponent]
    });
    fixture = TestBed.createComponent(NisuaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
