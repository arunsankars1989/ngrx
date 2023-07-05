import { createReducer } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(initialState);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthReducer(state: any, action: any): AuthState {
  return _authReducer(state, action);
}
