import { CanActivateFn } from '@angular/router';

export const customerGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('token') == null)
    return false
    else return true
};
