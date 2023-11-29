import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { IReduxStoreWithManager, TStateSchemaKey } from 'app/providers/StoreProvider/config/IStateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type TReducerList = {
  [name in TStateSchemaKey]?: Reducer
}

type useDynamicModelLoaderProps = {
  reducers: TReducerList,
  removeAfterUnmount?: boolean
}
export const useDynamicReducerLoader = (props: useDynamicModelLoaderProps) => {
  const {
    reducers,
    removeAfterUnmount = true,
  } = props;
  const store = useStore() as IReduxStoreWithManager;
  const dispatch = useDispatch();
  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    Object.entries(reducers)
      .forEach(([keyReducer, reducer]) => {
        const mounted = mountedReducers[keyReducer as TStateSchemaKey];
        if (!mounted) {
          store.reducerManager.add(keyReducer as TStateSchemaKey, reducer as Reducer);
          dispatch({ type: `@INIT ${keyReducer} reducer` });
        }
      });
    return () => {
      if (removeAfterUnmount) {
        Object.keys(reducers)
          .forEach((keyReducer) => {
            store.reducerManager.remove(keyReducer as TStateSchemaKey);
            dispatch({ type: `@DESTROY ${keyReducer}  reducer` });
          });
      }
    };
    // eslint-disable-next-line
  }, []);
};
