import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess } from './posts.actions';
import { Post } from '../../models/posts.model';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    const post = { ...action.post };
    return {
      ...state,
      posts: [ ...state.posts, post ]
    };
  }),
  on(updatePostSuccess, (state, action) => {
    const updatedPost: Post[] = state.posts.map((post: Post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedPost
    };
  }),
  on(deletePostSuccess, (state, { id }) => {
    const updatedPost: Post[] = state.posts.filter(post => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPost
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts
    };
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
