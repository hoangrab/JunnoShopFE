import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { storageUtils } from 'src/app/shared/helpers/storage';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if(storageUtils.get('currentUser')==null || storageUtils.get('currentUser').role.id==2) {
    console.log('da chay vao guard')
    router.navigate(['public/login'])
    return false;
  }
  return true;
};
