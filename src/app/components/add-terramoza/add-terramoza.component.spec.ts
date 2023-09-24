import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerramozaComponent } from './add-terramoza.component';

describe('AddTerramozaComponent', () => {
  let component: AddTerramozaComponent;
  let fixture: ComponentFixture<AddTerramozaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTerramozaComponent]
    });
    fixture = TestBed.createComponent(AddTerramozaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
