import { SHARED_STATE_NAME } from '../store/shared/shared.selector';
import { SharedState } from '../store/shared/shared.state';
import { SharedReducer } from '../store/shared/shared.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer
};
