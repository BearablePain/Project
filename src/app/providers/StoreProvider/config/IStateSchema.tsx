import { ILoginSchema } from 'features/AuthByUsername/model/types/ILoginSchema';
import { ICounterSchema } from 'entities/Counter';
import { IUserSchema } from 'entities/User';
import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';

export interface IStateSchema {
  counter: ICounterSchema;
  user: IUserSchema;
  // Асинхронные редюсеры
  loginForm?: ILoginSchema;
}
export type StateSchemaKey = keyof IStateSchema;

export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IStateSchema>;
  // eslint-disable-next-line no-unused-vars
  reduce: (state: IStateSchema, action: AnyAction) => CombinedState<IStateSchema>;
  // eslint-disable-next-line no-unused-vars
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  // eslint-disable-next-line no-unused-vars
  remove: (key: StateSchemaKey) => void;
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager;
}
