import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPost, deletePost, updatePost } from './posts.actions';
import { Post } from '../../models/posts.model';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    const post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [ ...state.posts, post ]
    };
  }),
  on(updatePost, (state, action) => {
    const udpatedPost: Post[] = state.posts.map((post: Post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
      posts: udpatedPost
    };
  }),
  on(deletePost, (state, { id }) => {
    const updatedPost: Post[] = state.posts.filter(post => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPost
    };
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
