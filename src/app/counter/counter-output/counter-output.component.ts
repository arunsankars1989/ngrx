import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCounter } from '../state/counter.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: [ './counter-output.component.scss' ]
})
export class CounterOutputComponent implements OnInit {

  counter$: Observable<number> = new Observable<number>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.counter$ = this.store.select(getCounter);
  }

}
