import { createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import { loginSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {

    return {
      ...state,
      user: action.user
    };
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthReducer(state: any, action: any): AuthState {
  return _authReducer(state, action);
}
