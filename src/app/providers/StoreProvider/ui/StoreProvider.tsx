import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { IStateSchema } from 'app/providers/StoreProvider/config/IStateSchema';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from 'app/providers/StoreProvider';
import { TReducerList } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<IStateSchema>;
  asyncReducers?: TReducerList;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
    initialState,
    asyncReducers,
  } = props;
  // const navigate = useNavigate();
  const store = createReduxStore(initialState as IStateSchema, asyncReducers as ReducersMapObject<IStateSchema>);

  console.log('RENDER');

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
