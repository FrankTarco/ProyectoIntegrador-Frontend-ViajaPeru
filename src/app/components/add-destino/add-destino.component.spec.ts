import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinoComponent } from './add-destino.component';

describe('AddDestinoComponent', () => {
  let component: AddDestinoComponent;
  let fixture: ComponentFixture<AddDestinoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDestinoComponent]
    });
    fixture = TestBed.createComponent(AddDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
