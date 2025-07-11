import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../services/carrito/carrito.service';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  router = inject(Router);
  @Input() producto!: Producto; //Le digo aca que el padre me envie el producto
  @Output() irAVerDetalleProductoEvent = new EventEmitter<number>();
  usuarioService = inject(UserService);
  messageService = inject(MessageService);
  carritoService = inject(CarritoService);

  ngOnInit() {
  }
  irAVerDetalleProducto(id: number) {
    this.router.navigate(['/ver-detalle-producto', id]);
  }

  agregarProducto(producto: Producto) {
    if (this.usuarioService.verificarSesion()) {
      let response = this.carritoService.agregarProductoAlCarrito(producto);
      response.subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Agregado',
            detail: `${producto.nombre} agregado al carrito`,
          });
        },
        error: (error) => {
          console.error('Error al agregar producto al carrito:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `No se pudo agregar ${producto.nombre}  al carrito.`,
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes iniciar sesión para agregar productos al carrito.',
      });
    }
  }
}
