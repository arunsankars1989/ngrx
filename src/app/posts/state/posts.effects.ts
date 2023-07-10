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
import { catchError, exhaustMap, filter, map, mergeMap, of, switchMap, take } from 'rxjs';
import { Post } from '../../models/posts.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { setErrorMessage, setLoadingSpinner } from '../../store/shared/shared.actions';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { getPostById } from './posts.selector';
import { Update } from '@ngrx/entity';

@Injectable()
export class PostsEffects {

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.postsService.getPosts().pipe(
          map((posts: Post[]) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
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
            const updatedPost: Update<Post> = {
              id: action.post.id as string,
              changes: {
                ...action.post
              }
            };
            return updatePostSuccess({ post: updatedPost });
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

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (r.payload.routerState as any)['params']['id'];
      }),
      switchMap((id) => {
        console.log('came here');
        return this.store.pipe(
          take(1),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          select<AppState, any>(getPostById),
          exhaustMap((post) => {
            if (post) {
              const postData = [ { ...post, id } ];
              return of(loadPostsSuccess({ posts: postData }));
            } else {
              console.log('came here 2');
              return this.postsService.getPostById(id)
                .pipe(
                  map((post) => {
                    const postData = [ { ...post, id } ];
                    return loadPostsSuccess({ posts: postData });
                  })
                );
            }
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
