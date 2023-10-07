import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItinerarioComponent } from './add-edit-itinerario.component';

describe('AddEditItinerarioComponent', () => {
  let component: AddEditItinerarioComponent;
  let fixture: ComponentFixture<AddEditItinerarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditItinerarioComponent]
    });
    fixture = TestBed.createComponent(AddEditItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
