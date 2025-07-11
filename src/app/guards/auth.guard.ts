import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  const estaLogeado = userService.EstaLogeado();
  const EsAdmin = userService.EsAdmin;

  if (estaLogeado && EsAdmin()) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
