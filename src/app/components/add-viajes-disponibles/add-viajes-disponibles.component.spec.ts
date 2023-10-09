import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViajesDisponiblesComponent } from './add-viajes-disponibles.component';

describe('AddViajesDisponiblesComponent', () => {
  let component: AddViajesDisponiblesComponent;
  let fixture: ComponentFixture<AddViajesDisponiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddViajesDisponiblesComponent]
    });
    fixture = TestBed.createComponent(AddViajesDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
