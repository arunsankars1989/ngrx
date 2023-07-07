import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

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

}
