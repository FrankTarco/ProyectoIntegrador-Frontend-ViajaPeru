import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModVentaComponent } from './mod-venta.component';

describe('ModVentaComponent', () => {
  let component: ModVentaComponent;
  let fixture: ComponentFixture<ModVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModVentaComponent]
    });
    fixture = TestBed.createComponent(ModVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
