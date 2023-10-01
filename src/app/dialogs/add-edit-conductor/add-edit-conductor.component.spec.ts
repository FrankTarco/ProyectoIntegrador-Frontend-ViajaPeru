import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditConductorComponent } from './add-edit-conductor.component';

describe('AddEditConductorComponent', () => {
  let component: AddEditConductorComponent;
  let fixture: ComponentFixture<AddEditConductorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditConductorComponent]
    });
    fixture = TestBed.createComponent(AddEditConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
