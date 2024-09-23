import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActionReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from '@shared/state/reducers/auth.reducer';
import { AuthEffects } from '@shared/state/effects/auth.effects';
import { BlogEffects } from '@shared/state/effects/blog.effects';
import { blogReducer } from '@shared/state/reducers/blog.reducers';
import { generalReducer } from '@shared/state/reducers/general.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MetaReducer, ActionReducerMap } from '@ngrx/store';
import { AppState } from '@shared/models/app-state.model';

const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  blogs: blogReducer,
  general: generalReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<AppState>) {
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  return isBrowser ? localStorageSync({ keys: ['auth', 'blogs'], rehydrate: true })(reducer) : reducer;
}

const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideStore(reducers, { metaReducers }),
    provideEffects([AuthEffects, BlogEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
