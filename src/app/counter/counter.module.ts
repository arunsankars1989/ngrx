import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CustomCounterInputComponent } from './custom-counter-input/custom-counter-input.component';
import { CounterRoutingModule } from './counter-routing.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';
import { COUNTER_STATE_NAME } from './state/counter.selectors';

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent
  ],
  imports: [
    CommonModule,
    CounterRoutingModule,
    FormsModule,
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
  ]
})
export class CounterModule {

}
