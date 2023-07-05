import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { IReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/IStateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type TReducerList = {
  [name in StateSchemaKey]?: Reducer
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
    Object.entries(reducers)
      .forEach(([keyReducer, reducer]) => {
        store.reducerManager.add(keyReducer as StateSchemaKey, reducer as Reducer);
        dispatch({ type: `@INIT ${keyReducer} reducer` });
      });
    return () => {
      if (removeAfterUnmount) {
        Object.keys(reducers)
          .forEach((keyReducer) => {
            store.reducerManager.remove(keyReducer as StateSchemaKey);
            dispatch({ type: `@DESTROY ${keyReducer}  reducer` });
          });
      }
    };
    // eslint-disable-next-line
  }, []);
};
