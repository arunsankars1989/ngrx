import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, state => {
  return state.posts;
});

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts ? posts.find((post: any) => post.id === route.params['id']) : null;
  });
