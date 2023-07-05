import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

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
    console.log(this.loginForm.value);
  }

}
