import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: [ './counter-output.component.scss' ]
})
export class CounterOutputComponent implements OnInit {

  counter = 0;

  constructor(private store: Store<{ counter: CounterState }>) {
  }

  ngOnInit() {
    this.store.select('counter').subscribe(data => {
      console.log('Counter observable called');
      this.counter = data.counter;
    });
  }

}
