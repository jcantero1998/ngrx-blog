import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralState } from '../reducers/general.reducer';

export const selectGeneralState = createFeatureSelector<GeneralState>('general');

export const selectIsDevMode = createSelector(
  selectGeneralState,
  (state: GeneralState) => state.isDevMode
);
