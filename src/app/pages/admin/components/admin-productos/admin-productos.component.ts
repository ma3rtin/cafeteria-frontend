import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto/producto.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ProgressSpinner } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../../../../../../public/header/header.component';
import { FooterComponent } from '../../../../../../public/footer/footer.component';

@Component({
  selector: 'app-admin-productos',
  imports: [ProgressSpinner, TableModule, ButtonModule, ToastModule, HeaderComponent, FooterComponent],
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.css'
})

export class AdminProductosComponent implements OnInit {

  productos: any[] = [];
  productoService = inject(ProductoService);
  router = inject(Router);
  messageService = inject(MessageService);
  spinner: boolean = true;
  spinnerList: boolean = true;

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.spinner = true;
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.spinner = false;
      },
      error: (err) => {
        this.spinner = false;
      }
    });
  }

  crearProducto() {
    this.router.navigate(['/admin/productos/crear']);
  }

  editarProducto(id: number) {
    this.router.navigate(['/admin/productos/editar', id]);
  }

  irAVerDetalleProducto(id: number) {
    this.router.navigate(['/ver-detalle-producto', id]);
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProductoPorId(id).subscribe({
        next: () => {
          this.productos = this.productos.filter((p) => p.id !== id);
          this.messageService.add({
            severity: 'success',
            summary: 'Producto eliminado',
            detail: 'El producto se eliminó correctamente',
            life: 3000
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message || 'No se pudo eliminar el producto',
            life: 3000
          });
        }
      });
    }
  }
}
