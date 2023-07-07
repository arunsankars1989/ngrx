import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
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
    const emailElement = this.signUpForm.get('email');
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
    const passwordElement = this.signUpForm.get('password');
    if (passwordElement?.touched && !passwordElement.valid) {
      if (passwordElement.errors?.['required']) {
        return 'Password is required';
      }
    }
    return null;
  }

  onSubmit(): void {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this.store.dispatch(signupStart({ email, password }));
  }

}
