import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { getToken } from '../auth/state/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      exhaustMap((token) => {
        if (!token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: req.params.append('auth', token)
        });
        return next.handle(modifiedReq);
      })
    );
  }

}
