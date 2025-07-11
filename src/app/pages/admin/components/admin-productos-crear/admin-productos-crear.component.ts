import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-admin-productos-crear',
  imports: [FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './admin-productos-crear.component.html',
  styleUrls: ['./admin-productos-crear.component.css']
})
export class AdminProductoCrearComponent implements OnInit {

  form!: FormGroup;
  tipoProductos: TipoProductoItem[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

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
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.productoService.crearProducto(this.form.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Producto creado',
          detail: 'El producto se creó correctamente',
          life: 3000
        });
        this.router.navigate(['/admin/productos']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message || 'No se pudo crear el producto',
          life: 3000
        });
        console.error(err);
      }
    });
  }


  cancelar() {
    this.router.navigate(['/admin/productos']);
  }
}
