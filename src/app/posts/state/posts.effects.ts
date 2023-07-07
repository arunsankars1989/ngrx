import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../../services/posts.service';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from './posts.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Post } from '../../models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { setErrorMessage, setLoadingSpinner } from '../../store/shared/shared.actions';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';

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
      switchMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return this.postsService.updatePost(action.post)
          .pipe(map(() => {
            return updatePostSuccess({ post: action.post });
          }),
          catchError((errResp) => {
            const errorMessage: string = this.generalService.getErrorMessage(errResp.error.error.message);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message: errorMessage }));
          })
          );
      })
    );
  });

  updatePostRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePostSuccess),
      map(() => {
        this.router.navigate([ 'posts' ]).then();
      })
    );
  }, { dispatch: false });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map(() => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private generalService: GeneralService,
    private store: Store<AppState>,
    private router: Router
  ) {
  }

}
