import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../../services/posts.service';
import { addPost, addPostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';
import { map, mergeMap } from 'rxjs';
import { Post } from '../../models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { setLoadingSpinner } from '../../store/shared/shared.actions';

@Injectable()
export class PostsEffects {

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts: Post[]) => {
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.postsService.addPost(action.post)
          .pipe(map((data) => {
            const post = { ...action.post, id: data.name };
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return addPostSuccess({ post });
          }));
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return this.postsService.updatePost(action.post)
          .pipe(map(() => {
            const post = { ...action.post };
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return updatePostSuccess({ post });
          }));
      })
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>
  ) {
  }

}
