import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UsuarioRegistro } from '../pages/signup/interfaces/usuario-registro.interface';
import { CredencialesLogin } from '../pages/login/interfaces/credenciales-login.interface';
import { RecuperarContrasena } from './../pages/recuperar-contrasena/interfaces/recuperar-contrasena.interface';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = 'http://localhost:3000/api/usuario';

  http = inject(HttpClient);
  constructor() { }
  iniciarSesion(credenciales: CredencialesLogin) {
    return this.http.post(`${this._url}/login`, credenciales).pipe(
      map((response) => {
        return response;
      })
    );
  }

  registrar(usuario: UsuarioRegistro) {
    return this.http.post(`${this._url}`, usuario).pipe(
      map((response) => {
        return response;
      })
    );
  }

  verificarSesion() {
  if (typeof window === 'undefined') {
    return this.http.post(`${this._url}/validar-token`, {}, {
      headers: { Authorization: '' }
    }).pipe(map(() => false));
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return this.http.post(`${this._url}/validar-token`, {}, {
      headers: { Authorization: '' }
    }).pipe(map(() => false));
  }

  return this.http.post(
    `${this._url}/validar-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(
    map((response: any) => {
      return !!response?.id;
    })
  );
}

  EstaLogeado(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Podés agregar verificación extra aquí, ej. expiración del token
      return true;
    } catch (e) {
      return false;
    }
  }

  EsAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.rol === 'admin';
    } catch (e) {
      return false;
    }
  }


  recuperarContrasena(credenciales: RecuperarContrasena) {
    return this.http.post(`${this._url}/actualizar`, credenciales).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
