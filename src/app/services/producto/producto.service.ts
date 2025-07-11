import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { Producto } from '../../pages/models/producto';
import { TipoProducto } from '../../../enums/app.enums';

export interface TipoProductoItem {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/productos';//Es la URL donde se encuentran los productos en nuestro back de Node.js
  // Esta URL debe coincidir con la ruta definida con el servidor Express para manejar productos
  // Le pedimos una request HTTP al servidor para que nos traiga los productos
  // y nos los devuelva en formato JSON
  
  constructor(private http: HttpClient) { }
  

  obtenerProductos(): Observable<Producto[]> {
    //Hacemos una petición GET al servidor para obtener la lista de productos
    // y devolvemos un Observable que emitirá un array de productos
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProductosPorTipoProducto(
    tipoProducto: TipoProducto
  ): Observable<Producto[]> {
    return this.http.post<Producto[]>(`${this.apiUrl}/tipo`, { tipoProducto });
  }

  irAVerDetalleProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
  obtenerProductosPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/nombre/${nombre}`);
  }
  obtenerProductosPorDescripcion(descripcion: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/descripcion/${descripcion}`);
  }
  obtenerProductosPorRangoPrecio(precioMinimo: number, precioMaximo: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/precio/${precioMinimo}/${precioMaximo}`);
  }
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
  obtenerTiposProducto(): Observable<TipoProductoItem[]> {
    return this.http.get<TipoProductoItem[]>(`${this.apiUrl}/tipos`);
  }
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
  actualizarProductoPorId(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }
  eliminarProductoPorId(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}