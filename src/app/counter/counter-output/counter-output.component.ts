import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: [ './counter-output.component.scss' ]
})
export class CounterOutputComponent implements OnInit {

  counter$?: Observable<{ counter: number }>;
  counterSubscription?: Subscription;

  constructor(private store: Store<{ counter: CounterState }>) {
  }

  ngOnInit() {
    this.counter$ = this.store.select('counter');
  }

}
