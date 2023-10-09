import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeleccionAsientosComponent } from './add-seleccion-asientos.component';

describe('AddSeleccionAsientosComponent', () => {
  let component: AddSeleccionAsientosComponent;
  let fixture: ComponentFixture<AddSeleccionAsientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSeleccionAsientosComponent]
    });
    fixture = TestBed.createComponent(AddSeleccionAsientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
