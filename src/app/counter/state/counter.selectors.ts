import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

// The name counter from the app.module.ts inside the forRoot
const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCounterState, state => {
  return state.counter;
});

export const getChannelName = createSelector(getCounterState, state => {
  return state.channelName;
});
