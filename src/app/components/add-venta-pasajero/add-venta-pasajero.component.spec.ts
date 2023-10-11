import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVentaPasajeroComponent } from './add-venta-pasajero.component';

describe('AddVentaPasajeroComponent', () => {
  let component: AddVentaPasajeroComponent;
  let fixture: ComponentFixture<AddVentaPasajeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVentaPasajeroComponent]
    });
    fixture = TestBed.createComponent(AddVentaPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
