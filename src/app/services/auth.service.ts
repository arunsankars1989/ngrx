import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/authResponseData.model';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { logout } from '../auth/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timeoutInterval: any;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData): User {
    const expirationDate: Date = new Date(new Date().getTime() + +data.expiresIn * 1000);
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }

  getErrorMessage(message: string): string {
    switch (message) {
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
      return 'Invalid email id or password';
    case 'EMAIL_EXISTS':
      return 'The email address is already in use with another account';
    case 'OPERATION_NOT_ALLOWED':
      return 'Password sign-in is disabled for this project';
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      return 'We have blocked all requests from this device due to unusual activity. Try again later';
    default:
      return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User): void {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(logout());
    }, timeInterval);
  }

  getUserFromLocalStorage(): User {
    const userDataString = localStorage.getItem('userData');
    let user: User = {} as User;
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      user = new User(userData.email, userData.token, userData.localId, expirationDate);
      this.runTimeoutInterval(user);
    }
    return user;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

}
