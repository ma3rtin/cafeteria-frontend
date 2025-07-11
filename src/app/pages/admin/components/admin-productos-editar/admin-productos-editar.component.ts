import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../../services/producto/producto.service';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../../../../../../public/header/header.component';
import { FooterComponent } from '../../../../../../public/footer/footer.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface TipoProductoItem {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-admin-productos-editar',
  imports: [FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './admin-productos-editar.component.html',
  styleUrls: ['./admin-productos-editar.component.css']
})
export class AdminProductoEditarComponent implements OnInit {

  form!: FormGroup;
  tipoProductos: TipoProductoItem[] = [];
  productoId!: number;

  private productoService = inject(ProductoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      clasificacion: ['', Validators.required],
      tipoProducto: [null, Validators.required]
    });

    this.productoService.obtenerTiposProducto().subscribe({
      next: (tipos) => this.tipoProductos = tipos,
      error: (err) => console.error('Error al cargar tipos de producto', err)
    });

    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productoId) {
      this.productoService.obtenerProductoPorId(this.productoId).subscribe({
        next: (producto) => {
          this.form.patchValue({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
            clasificacion: producto.clasificacion,
            tipoProducto: producto.tipoProducto
          });
        },
        error: (err) => {
          console.error('Error al cargar producto', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el producto' });
          this.router.navigate(['/admin/productos']);
        }
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.productoService.actualizarProductoPorId(this.productoId, this.form.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado correctamente' });
        this.router.navigate(['/admin/productos']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el producto' });
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/productos']);
  }
}
