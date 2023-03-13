import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { IStateSchema } from 'app/providers/StoreProvider/config/IStateSchema';
import { DeepPartial } from '@reduxjs/toolkit';
import { createReduxStore } from 'app/providers/StoreProvider';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<IStateSchema>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
    initialState,
  } = props;

  const store = createReduxStore(initialState as IStateSchema);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
