import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBusComponent } from './add-edit-bus.component';

describe('AddEditBusComponent', () => {
  let component: AddEditBusComponent;
  let fixture: ComponentFixture<AddEditBusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBusComponent]
    });
    fixture = TestBed.createComponent(AddEditBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
