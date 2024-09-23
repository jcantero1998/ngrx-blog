import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select('auth').pipe(
    map(authState => {
      if (!authState.loggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
