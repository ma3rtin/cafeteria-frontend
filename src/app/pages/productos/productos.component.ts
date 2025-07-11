import { Producto } from './../models/producto';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';
import { TipoProducto } from '../../../enums/app.enums';
import { FooterComponent } from "../../../../public/footer/footer.component";
import { HeaderComponent } from "../../../../public/header/header.component";
import { Router } from '@angular/router';
import { ProductCardComponent } from "../product-card/product-card.component";
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-productos',
  imports: [FooterComponent, HeaderComponent, ProductCardComponent, FormsModule, ToastModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})

export class ProductosComponent implements OnInit {
  precioMinimo!: number;
  precioMaximo!: number;

  productos: Producto[] = [];
  tipoProductos = Object.values(TipoProducto);
  router = inject(Router);
  obtenerPorNombre = new Subject<string>();
    obtenerPorDescripcion = new Subject<string>();
  // Me trae todos los valores del enum TipoProducto
  //tipoProducto: TipoProducto = TipoProducto.CAFE_EN_GRANOS; // Le pongo un valor por defecto
  constructor(private productoService: ProductoService) {

  }


  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;//Le decimos al obtener productos que se compare con la data para reemplazar su valor.

      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    }
    );


//Obtener productos por nombre
  this.obtenerPorNombre
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(nombre => {
      this.productoService.obtenerProductosPorNombre(nombre).subscribe({
        next: (data) => this.productos = data,
        error: (error) => console.error('Error al obtener los productos por nombre:', error)
      });
    });
//Obtener productos por descripcion
      this.obtenerPorDescripcion
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(descripcion => {
      this.productoService.obtenerProductosPorDescripcion(descripcion).subscribe({
        next: (data) => this.productos = data,
        error: (error) => console.error('Error al obtener los productos por descripcion:', error)
      });
    });
  }

  obtenerProductosPorTipoProducto(tipoProducto: TipoProducto): Producto[] {
    // Actualiza el tipo de producto seleccionado

    this.productoService.obtenerProductosPorTipoProducto(tipoProducto).subscribe({
      next: (data) => {
        this.productos = data; // Actualiza la lista de productos filtrados por tipo
      },
      error: (error) => {
        console.error('Error al obtener los productos por tipo:', error);
      }
    }
    );
    return this.productos;
  }

  obtenerProductosPorNombre(event: Event): void {
  const input = event.target as HTMLInputElement;
  const nombre = input.value;
  this.obtenerPorNombre.next(nombre);
  }

  obtenerProductosPorDescripcion(event: Event): void {
    const inputDesc = event.target as HTMLInputElement;
    const descripcion = inputDesc.value;
  this.obtenerPorDescripcion.next(descripcion);
  }


  obtenerProductosPorRangoPrecio(precioMinimo: number, precioMaximo: number) {

    this.productoService.obtenerProductosPorRangoPrecio(precioMinimo, precioMaximo).subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos por precio:', error);
      }
    }
    );

  }
  reiniciarProductos() {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    }
    );
  }

}
