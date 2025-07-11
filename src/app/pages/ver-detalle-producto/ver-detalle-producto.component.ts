import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../models/producto';
import { CurrencyPipe } from '@angular/common';
import { FooterComponent } from "../../../../public/footer/footer.component";
import { HeaderComponent } from "../../../../public/header/header.component";
import { CarritoService } from '../../services/carrito/carrito.service';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ver-detalle-producto',
  imports: [CurrencyPipe, FooterComponent, HeaderComponent],
  templateUrl: './ver-detalle-producto.component.html',
  styleUrl: './ver-detalle-producto.component.css'
})
export class VerDetalleProductoComponent implements OnInit {
  usuarioService = inject(UserService);
  messageService = inject(MessageService);
  carritoService = inject(CarritoService);

    producto!: Producto;
  productos: Producto[] = [];
  constructor(private productoService: ProductoService, private router: ActivatedRoute) {

  }

ngOnInit(): void {
const id = this.router?.snapshot.paramMap.get('id');//Capturo el id en el momento que se carga el componente
if(id){
  this.productoService.irAVerDetalleProducto(Number(id)).subscribe({

    next: (data)=> this.producto = data,
        error: (error) => {
        console.error('Error al obtener el producto:', error);
      }
  })
}
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
