import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCopilotoComponent } from './list-copiloto.component';

describe('ListCopilotoComponent', () => {
  let component: ListCopilotoComponent;
  let fixture: ComponentFixture<ListCopilotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCopilotoComponent]
    });
    fixture = TestBed.createComponent(ListCopilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
