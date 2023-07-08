import { SHARED_STATE_NAME } from '../store/shared/shared.selector';
import { SharedState } from '../store/shared/shared.state';
import { SharedReducer } from '../store/shared/shared.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { AuthReducer } from '../auth/state/auth.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer
};
