import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipobusComponent } from './add-equipobus.component';

describe('AddEquipobusComponent', () => {
  let component: AddEquipobusComponent;
  let fixture: ComponentFixture<AddEquipobusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEquipobusComponent]
    });
    fixture = TestBed.createComponent(AddEquipobusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
