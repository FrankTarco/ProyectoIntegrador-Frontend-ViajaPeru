import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItinerarioComponent } from './add-itinerario.component';

describe('AddItinerarioComponent', () => {
  let component: AddItinerarioComponent;
  let fixture: ComponentFixture<AddItinerarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddItinerarioComponent]
    });
    fixture = TestBed.createComponent(AddItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
