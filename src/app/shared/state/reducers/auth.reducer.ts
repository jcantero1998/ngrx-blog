import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { User } from '@shared/models/user.model';

export interface AuthState {
  user: User | null;
  error: string | null;
  loggedIn: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    loggedIn: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loggedIn: false,
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    loggedIn: true,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    loggedIn: false,
  })),
  on(AuthActions.logout, state => ({
    ...state,
    user: null,
    loggedIn: false,
    error: null,
  }))
);
