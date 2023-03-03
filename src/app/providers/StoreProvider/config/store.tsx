import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities';
import { IStateSchema } from './IStateSchema';

export function createReduxStore(initialState?: IStateSchema) {
  return configureStore<IStateSchema>({
    reducer: {
      counter: counterReducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
