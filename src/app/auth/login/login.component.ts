import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  showEmailErrors(): string | null {
    const emailElement = this.loginForm.get('email');
    if (emailElement?.touched && !emailElement.valid) {
      if (emailElement.errors?.['required']) {
        return 'Email is required';
      }
      if (emailElement.errors?.['email']) {
        return 'Please enter a proper email';
      }
    }
    return null;
  }

  showPasswordErrors(): string | null {
    const passwordElement = this.loginForm.get('password');
    if (passwordElement?.touched && !passwordElement.valid) {
      if (passwordElement.errors?.['required']) {
        return 'Password is required';
      }
    }
    return null;
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.store.dispatch(loginStart({ email, password }));
  }

}
