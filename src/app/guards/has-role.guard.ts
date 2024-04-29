import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/login-services/storage.service';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService)
  const router = inject(Router)

  const account = storageService.getSavedAccount()

  if (account !== null && account.role !== null) {
    console.log(account.role);
   }
   console.log(route.data['role'])
  if (!account || account.role != route.data['role']){
    router.navigate(['/login'])
  }
  return true
};
