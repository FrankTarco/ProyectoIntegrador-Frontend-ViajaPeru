import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDestinoComponent } from './add-edit-destino.component';

describe('AddEditDestinoComponent', () => {
  let component: AddEditDestinoComponent;
  let fixture: ComponentFixture<AddEditDestinoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditDestinoComponent]
    });
    fixture = TestBed.createComponent(AddEditDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
