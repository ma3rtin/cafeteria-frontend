import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../../pages/models/producto';
import { Carrito } from '../../pages/carrito/interfaces/carrito.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor() {}

  private apiUrl = 'http://localhost:3000/api/usuario';
  http = inject(HttpClient);

  agregarProductoAlCarrito(producto: Producto): Observable<any> {
    const token = this.getToken();
    if (!token) return of(null);

    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.apiUrl}/agregar-al-carrito`, producto, { headers });
  }

  obtenerCarrito(): Observable<Carrito> {
    const token = this.getToken();
    if (!token) return of({ id: 0, id_usuario: 0, items: [] });

    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
    return this.http.get<Carrito>(`${this.apiUrl}/carrito`, { headers });
  }

  vaciarCarrito(): Observable<any> {
    const token = this.getToken();
    if (!token) return of(null);

    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
    return this.http.delete(`${this.apiUrl}/carrito`, { headers });
  }

  eliminarProductoDelCarrito(id: number): Observable<any> {
    const token = this.getToken();
    if (!token) return of(null);

    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
    return this.http.delete(`${this.apiUrl}/carrito/${id}`, { headers });
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
}
