import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../../auth/state/auth.selector';
import { logout } from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

  isAuthenticated: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }

}
