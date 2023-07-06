import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { map, mergeMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthResponseData } from '../../models/authResponseData.model';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from '../../store/shared/shared.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.authService.login(action.email, action.password)
          .pipe(map((data: AuthResponseData) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loginSuccess({ user });
          }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
  }

}
