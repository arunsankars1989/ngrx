import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { User } from '../../models/user.model';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, state => {
  if ((typeof state.user !== undefined) && (state.user !== null)) {
    return (Object.keys(state.user as User).length !== 0);
  }
  return false;

});
