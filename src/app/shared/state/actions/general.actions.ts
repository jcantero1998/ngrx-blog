import { createAction, props } from '@ngrx/store';

export const setDevelopmentMode = createAction(
  '[General] Set Development Mode',
  props<{ isDevMode: boolean }>()
);
