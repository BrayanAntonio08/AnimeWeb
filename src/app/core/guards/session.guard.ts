import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

/**
 * This method is used for auth module, where is not necesary to enter if the user is authenticated
 * @param route 
 * @param state 
 * @returns 
 */
export const sessionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserActive()) {
    router.navigate(['/']);
    return false;

  }
  return true;
};
