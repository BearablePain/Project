import { DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
  test('should return value', () => {
    const state = {
      loginForm: {
        username: '123123',
      },
    };
    expect(getLoginUsername(state as IStateSchema))
      .toEqual('123123');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {};
    expect(getLoginUsername(state as IStateSchema))
      .toEqual('');
  });
});
