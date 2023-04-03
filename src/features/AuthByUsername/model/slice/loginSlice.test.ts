import { DeepPartial } from '@reduxjs/toolkit';
import { ILoginFormValues } from 'features/AuthByUsername/ui/LoginForm/LoginForm';
import { ILoginSchema } from '../types/ILoginSchema';
import { loginActions, loginReducer } from './loginSlice';

const mockUserValue: ILoginFormValues = { username: 'username', password: '123' };
describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<ILoginSchema> = { username: '123' };
    expect(loginReducer(
            state as ILoginSchema,
            loginActions.setUsername(mockUserValue.username),
    )).toEqual({ username: mockUserValue.username });
  });

  test('test set password', () => {
    const state: DeepPartial<ILoginSchema> = { password: '123' };
    expect(loginReducer(
            state as ILoginSchema,
            loginActions.setPassword(mockUserValue.password),
    )).toEqual({ password: mockUserValue.password });
  });
});
