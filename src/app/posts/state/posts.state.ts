import { Post } from '../../models/posts.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export type PostsState = EntityState<Post>

export const postsAdapter = createEntityAdapter<Post>();

export const initialState: PostsState = postsAdapter.getInitialState();
