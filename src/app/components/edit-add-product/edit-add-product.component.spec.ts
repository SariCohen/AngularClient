import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogModule } from 'primeng/dialog';
import { EditAddProductComponent } from './edit-add-product.component';

describe('EditAddProductComponent', () => {
  let component: EditAddProductComponent;
  let fixture: ComponentFixture<EditAddProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddProductComponent]
    });
    fixture = TestBed.createComponent(EditAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
