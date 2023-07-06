import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { Observable, of } from 'rxjs';
import { isAuthenticated } from '../../../auth/state/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

  isAuthenticated: Observable<boolean> = of();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

}
