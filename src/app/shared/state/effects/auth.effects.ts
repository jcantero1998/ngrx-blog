import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((user) => {
            if (user) {
              return AuthActions.loginSuccess({ user });
            } else {
              return AuthActions.loginFailure({ error: 'Invalid credentials' });
            }
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this.authService.register(action.email, action.password).pipe(
          map((user) => AuthActions.registerSuccess({ user })),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.snackBar.open('Successful login', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  registerSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.snackBar.open('Successful registration', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  loginFailureAlert$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.snackBar.open(error, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        })
      ),
    { dispatch: false }
  );

  registerFailureAlert$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),
        tap(({ error }) => {
          this.snackBar.open(error, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('auth');
          this.snackBar.open('Successful logout', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );

}
