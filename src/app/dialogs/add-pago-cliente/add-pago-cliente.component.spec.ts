import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagoClienteComponent } from './add-pago-cliente.component';

describe('AddPagoClienteComponent', () => {
  let component: AddPagoClienteComponent;
  let fixture: ComponentFixture<AddPagoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPagoClienteComponent]
    });
    fixture = TestBed.createComponent(AddPagoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
