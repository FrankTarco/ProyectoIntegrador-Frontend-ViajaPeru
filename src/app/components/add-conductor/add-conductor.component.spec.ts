import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConductorComponent } from './add-conductor.component';

describe('AddConductorComponent', () => {
  let component: AddConductorComponent;
  let fixture: ComponentFixture<AddConductorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConductorComponent]
    });
    fixture = TestBed.createComponent(AddConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
