import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const loggedInUser = inject(AuthService).getLoggedInUser();

  // if user is Admin ('A') role then go to destination
  // else ...

  if(loggedInUser && loggedInUser.user.role === 'A'){
    return true
  }

  return false;
};
