import { createReducer } from '@ngrx/store';
import { initialState } from './posts.state';

const _postsReducer = createReducer(initialState);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
