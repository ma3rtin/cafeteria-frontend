import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductosComponent } from './admin-productos.component';

describe('AdminCrudComponent', () => {
  let component: AdminProductosComponent;
  let fixture: ComponentFixture<AdminProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
