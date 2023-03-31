import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';
import { IStateSchema } from './IStateSchema';

export function createReduxStore(initialState?: IStateSchema, asyncReducers?: ReducersMapObject<IStateSchema>) {
  const rootReducers: ReducersMapObject<IStateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    // Асинхронные редюсеры
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<IStateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
  // @ts-ignore TODO: add type
  store.reducerManager = reducerManager;
  return store;
}
