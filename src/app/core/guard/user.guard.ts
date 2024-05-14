import { CanActivateFn } from '@angular/router';
import { storageUtils } from 'src/app/shared/helpers/storage';

export const userGuard: CanActivateFn = (route, state) => {
  if(storageUtils.get('currentUser')==null || storageUtils.get('currentUser').role.id==2) {
    return false;
  }
  return true;
};
