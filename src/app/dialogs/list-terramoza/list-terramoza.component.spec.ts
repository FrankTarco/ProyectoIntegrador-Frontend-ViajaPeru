import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTerramozaComponent } from './list-terramoza.component';

describe('ListTerramozaComponent', () => {
  let component: ListTerramozaComponent;
  let fixture: ComponentFixture<ListTerramozaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTerramozaComponent]
    });
    fixture = TestBed.createComponent(ListTerramozaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
