import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVentaComponent } from './add-venta.component';

describe('AddVentaComponent', () => {
  let component: AddVentaComponent;
  let fixture: ComponentFixture<AddVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVentaComponent]
    });
    fixture = TestBed.createComponent(AddVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
