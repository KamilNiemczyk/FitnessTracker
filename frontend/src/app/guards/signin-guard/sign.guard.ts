import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const signGuard: CanActivateFn = () => {
  const router = inject(Router);
  if(localStorage.getItem('token')){
    return router.createUrlTree(['/']);
  }
  
  return true;
};
