
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { HomeComponent } from './pages/home/home.component';
import { VerDetalleProductoComponent } from './pages/ver-detalle-producto/ver-detalle-producto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { AdminProductosComponent } from './pages/admin/components/admin-productos/admin-productos.component';
import { AdminProductoCrearComponent } from './pages/admin/components/admin-productos-crear/admin-productos-crear.component';
import { AdminProductoEditarComponent } from './pages/admin/components/admin-productos-editar/admin-productos-editar.component';
import { AuthGuard } from './guards/auth.guard';

//Podemos cargar todas las rutas en este solo archivo o hacer un routing
// para cada componente
export const routes: Routes = [
    { path: 'login', component: LoginComponent,
        data: {
    renderMode: 'no-preference'
  }
     },
    { path: 'signup', component: SignupComponent,
      data: {
    renderMode: 'no-preference'
  }
     },
    { path: 'productos', component: ProductosComponent,data: {
    renderMode: 'no-preference'
  } },
    { path: 'home', component: HomeComponent,
      data: {
    renderMode: 'no-preference'
  }
     },
    { path: 'ver-detalle-producto/:id', component: VerDetalleProductoComponent,
      data: {
    renderMode: 'no-preference'
  }
     },
    { path: 'carrito', component: CarritoComponent,
      data: {
    renderMode: 'no-preference'
  }
     },
    { path: 'recuperar', component: RecuperarContrasenaComponent,data: {
    renderMode: 'no-preference'
  } },
    { path: 'admin/productos', component: AdminProductosComponent, canActivate: [AuthGuard],
      data: {
    renderMode: 'no-preference'
  }
     },
    { path: 'admin/productos/crear', component: AdminProductoCrearComponent, canActivate: [AuthGuard],
      data: {
    renderMode: 'no-preference'
  }
     },
    { path: 'admin/productos/editar/:id', component: AdminProductoEditarComponent, canActivate: [AuthGuard] , data: {
    renderMode: 'no-preference'
  }},
    { path: '**', redirectTo: 'home' ,
      data: {
    renderMode: 'no-preference'
  }
    },
];
