import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { IReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/IStateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducerList = {
  // eslint-disable-next-line no-unused-vars
  [name in StateSchemaKey]?: Reducer
}

type ReducerListEntry = [StateSchemaKey, Reducer]

type useDynamicModelLoaderProps = {
  reducers: ReducerList,
  removeAfterUnmount?: boolean
}
export const useDynamicReducerLoader = (props: useDynamicModelLoaderProps) => {
  const {
    reducers, removeAfterUnmount = true,
  } = props;
  const store = useStore() as IReduxStoreWithManager;
  const dispatch = useDispatch();
  useEffect(() => {
    Object.entries(reducers).forEach(([keyReducer, reducer]: ReducerListEntry) => {
      store.reducerManager.add(keyReducer, reducer);
      dispatch({ type: `@INIT ${keyReducer} reducer` });
    });
    return () => {
      if (removeAfterUnmount) {
        Object.keys(reducers).forEach((keyReducer: StateSchemaKey) => {
          store.reducerManager.remove(keyReducer);
          dispatch({ type: `@DESTROY ${keyReducer}  reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);
};
