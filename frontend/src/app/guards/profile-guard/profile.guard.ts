import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
export const profileGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isLoggedIn()){
    return true;
  }
  
  return router.createUrlTree(['/signin']);
};
