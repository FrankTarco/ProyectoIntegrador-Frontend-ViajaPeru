import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTerramozaComponent } from './add-edit-terramoza.component';

describe('AddEditTerramozaComponent', () => {
  let component: AddEditTerramozaComponent;
  let fixture: ComponentFixture<AddEditTerramozaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTerramozaComponent]
    });
    fixture = TestBed.createComponent(AddEditTerramozaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
