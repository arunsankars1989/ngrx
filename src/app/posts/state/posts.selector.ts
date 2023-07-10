import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postsAdapter, PostsState } from './posts.state';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';
import { Post } from '../../models/posts.model';
import { Dictionary } from '@ngrx/entity';

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);

export const getPostEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (postEntities: Dictionary<Post>, route: RouterStateUrl) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return postEntities ? postEntities[route.params['id']] : null;
  });

export const getCount = createSelector(getPostsState, (state) => state.count);
