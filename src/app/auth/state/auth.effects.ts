import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { map, mergeMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password)
          .pipe(map(() => {
            return loginSuccess();
          }));
      })
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {
  }

}
