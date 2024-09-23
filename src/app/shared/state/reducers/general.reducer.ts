import { createReducer, on } from '@ngrx/store';
import { setDevelopmentMode } from '../actions/general.actions';

export interface GeneralState {
  isDevMode: boolean;
}

export const initialState: GeneralState = {
  isDevMode: true
};

export const generalReducer = createReducer(
  initialState,
  on(setDevelopmentMode, (state, { isDevMode }) => ({
    ...state,
    isDevMode
  }))
);
