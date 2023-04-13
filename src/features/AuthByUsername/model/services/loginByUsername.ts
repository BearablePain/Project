import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ILoginFormValues } from 'features/AuthByUsername/ui/LoginForm/LoginForm';
import { IUser, userActions } from 'entities/User';
import { IThunkConfig } from 'app/providers/StoreProvider';

export const loginByUsername = createAsyncThunk<IUser, Required<ILoginFormValues>, IThunkConfig<string>>(
  'login/loginByUsername',
  async (authData, thunkApi) => {
    const {
      extra,
      dispatch,
      rejectWithValue,
    } = thunkApi;

    try {
      const response = await extra.api.post<IUser>('http://localhost:8000/login', authData);
      if (!response.data) {
        throw new Error();
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
