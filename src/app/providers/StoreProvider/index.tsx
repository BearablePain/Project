import { StoreProvider } from './ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
import type { IStateSchema, IThunkConfig } from './config/IStateSchema';

export {
  StoreProvider,
  createReduxStore,
  IStateSchema,
  AppDispatch,
  IThunkConfig,
};
