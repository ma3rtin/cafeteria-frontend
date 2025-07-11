import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductoEditarComponent } from './admin-productos-editar.component';

describe('AdminProductoEditarComponent', () => {
  let component: AdminProductoEditarComponent;
  let fixture: ComponentFixture<AdminProductoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
