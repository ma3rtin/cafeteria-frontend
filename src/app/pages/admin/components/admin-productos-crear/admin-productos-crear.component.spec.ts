import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductoCrearComponent } from './admin-productos-crear.component';

describe('AdminProductoCrearComponent', () => {
  let component: AdminProductoCrearComponent;
  let fixture: ComponentFixture<AdminProductoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductoCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
