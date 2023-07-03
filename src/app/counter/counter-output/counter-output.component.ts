import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { getCounter } from '../state/counter.selectors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: [ './counter-output.component.scss' ]
})
export class CounterOutputComponent implements OnInit {

  counter$: Observable<number> = of();

  constructor(private store: Store<{ counter: CounterState }>) {
  }

  ngOnInit() {
    console.log('change of counter');
    this.counter$ = this.store.select(getCounter);
  }

}
