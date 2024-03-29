import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ILoginFormValues } from 'features/AuthByUsername/ui/LoginForm/LoginForm';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

const mockUserValue1: Required<ILoginFormValues> = {
  username: '123',
  password: '123',
};
describe('loginByUsername.test', () => {
  // let dispatch: Dispatch;
  // let getState: () => IStateSchema;
  //
  // beforeEach(() => {
  //     dispatch = jest.fn();
  //     getState = jest.fn();
  // });

  // test('success login', async () => {
  //     const userValue = { username: '123', id: '1' };
  //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
  //     const action = loginByUsername({ username: '123', password: '123' });
  //     const result = await action(dispatch, getState, undefined);
  //
  //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
  //     expect(dispatch).toHaveBeenCalledTimes(3);
  //     expect(mockedAxios.post).toHaveBeenCalled();
  //     expect(result.meta.requestStatus).toBe('fulfilled');
  //     expect(result.payload).toEqual(userValue);
  // });
  //
  // test('error login', async () => {
  //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
  //     const action = loginByUsername({ username: '123', password: '123' });
  //     const result = await action(dispatch, getState, undefined);
  //
  //     expect(dispatch).toHaveBeenCalledTimes(2);
  //     expect(mockedAxios.post).toHaveBeenCalled();
  //     expect(result.meta.requestStatus).toBe('rejected');
  //     expect(result.payload).toBe('error');
  // });

  test('success login', async () => {
    const userValue = {
      username: '123',
      id: '1',
    };

    const thunk = new TestAsyncThunk(loginByUsername);
    const { api } = thunk;
    api.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const result = await thunk.callThunk(mockUserValue1);

    expect(thunk.dispatch)
      .toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch)
      .toHaveBeenCalledTimes(3);
    expect(api.post)
      .toHaveBeenCalled();
    expect(result.meta.requestStatus)
      .toBe('fulfilled');
    expect(result.payload)
      .toEqual(userValue);
  });

  test('error login', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const thunk = new TestAsyncThunk(loginByUsername);
    const { api } = thunk;
    const result = await thunk.callThunk(mockUserValue1);

    expect(thunk.dispatch)
      .toHaveBeenCalledTimes(2);
    expect(api.post)
      .toHaveBeenCalled();
    expect(result.meta.requestStatus)
      .toBe('rejected');
    expect(result.payload)
      .toBe('error');
  });
});
