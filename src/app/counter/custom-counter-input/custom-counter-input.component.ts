import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { getChannelName } from '../state/counter.selectors';
import { Observable, of } from 'rxjs';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: [ './custom-counter-input.component.scss' ]
})
export class CustomCounterInputComponent implements OnInit {

  value = 0;
  channelName$: Observable<string> = of();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }

}
