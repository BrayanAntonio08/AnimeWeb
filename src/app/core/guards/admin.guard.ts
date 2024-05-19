import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isUserActive() && await authService.isUserAdmin()){
    return true;
  }
  router.navigate(['/']);
  return false;
};
