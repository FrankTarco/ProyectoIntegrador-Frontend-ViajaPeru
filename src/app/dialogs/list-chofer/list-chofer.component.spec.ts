import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChoferComponent } from './list-chofer.component';

describe('ListChoferComponent', () => {
  let component: ListChoferComponent;
  let fixture: ComponentFixture<ListChoferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListChoferComponent]
    });
    fixture = TestBed.createComponent(ListChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
