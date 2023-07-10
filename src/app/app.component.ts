import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { getErrorMesssage, getLoading } from './store/shared/shared.selector';
import { autoLogin } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  title = 'ngrx';
  showLoading: Observable<boolean> = new Observable<boolean>();
  errorMessage: Observable<string> = new Observable<string>();

  constructor(
    private translate: TranslateService,
    private store: Store<AppState>
  ) {
    translate.addLangs([ 'en' ]);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMesssage);
    this.store.dispatch(autoLogin());
  }

}
