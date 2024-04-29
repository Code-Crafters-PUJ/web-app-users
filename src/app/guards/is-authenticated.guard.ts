import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/login-services/storage.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService)
  const router = inject(Router)
  
  if(storageService.getSavedAccount() === null){
    router.navigate(['/login'])
  }
  return true;
};
