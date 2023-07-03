import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: [ './counter-output.component.scss' ]
})
export class CounterOutputComponent {

  @Input() counter: number;

  constructor() {
    this.counter = 0;
  }

}
