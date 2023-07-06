import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthResponseData } from '../../models/authResponseData.model';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from '../../store/shared/shared.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.authService.login(action.email, action.password)
          .pipe(
            map((data: AuthResponseData) => {
              const user = this.authService.formatUser(data);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setErrorMessage({ message: '' }));
              return loginSuccess({ user });
            }),
            catchError((errResp) => {
              const errorMessage: string = this.authService.getErrorMessage(errResp.error.error.message);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return of(setErrorMessage({ message: errorMessage }));
            })
          );
      })
    );
  });

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate([ '/' ]).then();
      })
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
  }

}
