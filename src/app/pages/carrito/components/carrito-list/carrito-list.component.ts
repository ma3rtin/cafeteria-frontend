import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarritoService } from '../../../../services/carrito/carrito.service';
import { Observable } from 'rxjs';
import { Carrito } from '../../interfaces/carrito.interface';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ItemCarrito } from '../../interfaces/item-carrito.interface';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-carrito-list',
  imports: [
    ProgressSpinner,
    ToastModule,
    ProgressSpinnerModule
  ],
  templateUrl: './carrito-list.component.html',
  styleUrl: './carrito-list.component.css',
})
export class CarritoListComponent implements OnInit, OnDestroy {
  constructor() {}

  carritoService = inject(CarritoService);
  messageService = inject(MessageService);
  carrito!: Observable<Carrito>;
  productos!: ItemCarrito[];
  total: number = 0;

  spinner: boolean = true;

  spinnerList: boolean = true;

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.carrito.subscribe({
      next: (data) => {
        this.spinner = false;
        this.spinnerList = false;
        this.productos = data.items;
        this.total = data.items.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        );
      },
    });
  }

  eliminarProducto(id: number) {
    this.spinnerList = true;

    this.carritoService.eliminarProductoDelCarrito(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Producto eliminado',
        });

        this.carritoService.obtenerCarrito().subscribe({
          next: (data) => {
            this.productos = data.items;
            this.total = data.items.reduce(
              (total, item) => total + item.precio * item.cantidad,
              0
            );
            this.spinnerList = false;
          },
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message || 'Error al eliminar',
        });
        this.spinnerList = false;
      },
    });
  }

  vaciarCarrito() {
    this.spinner = true;

    this.carritoService.vaciarCarrito().subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminados',
          detail: 'Carrito vacío',
        });

        this.carritoService.obtenerCarrito().subscribe({
          next: (data) => {
            this.productos = data.items;
            this.total = data.items.reduce(
              (total, item) => total + item.precio * item.cantidad,
              0
            );
            this.spinner = false;
          },
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message || 'Error al vaciar el carrito',
        });
        this.spinner = false;
      },
    });
  }

  ngOnDestroy() {}
}
