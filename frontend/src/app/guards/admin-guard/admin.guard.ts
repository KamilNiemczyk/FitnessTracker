import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  if(!localStorage.getItem('token')){
    return router.createUrlTree(['/']);
  }
  if(localStorage.getItem('isAdmin') !== 'true'){
    return router.createUrlTree(['/']);
  }
  
  return true;
};
