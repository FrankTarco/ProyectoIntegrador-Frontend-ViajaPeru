import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVentaClienteComponent } from './add-venta-cliente.component';

describe('AddVentaClienteComponent', () => {
  let component: AddVentaClienteComponent;
  let fixture: ComponentFixture<AddVentaClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVentaClienteComponent]
    });
    fixture = TestBed.createComponent(AddVentaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
