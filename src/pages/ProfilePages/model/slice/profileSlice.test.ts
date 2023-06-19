import {
  IProfileSchema, profileActions, profileReducer, updateProfileData,
} from 'entities/Profile';
import { profileDataMock } from 'shared/const/profileDataMock';

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<IProfileSchema> = { readonly: false };
    expect(profileReducer(
      state as IProfileSchema,
      profileActions.setReadonly(true),
    ))
      .toEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: DeepPartial<IProfileSchema> = {
      data: profileDataMock,
      form: { username: '' },
    };

    expect(profileReducer(
      state as IProfileSchema,
      profileActions.cancelEdit(),
    ))
      .toEqual({
        readonly: true,
        validateErrors: undefined,
        data: profileDataMock,
        form: profileDataMock,
      });
  });

  test('test update profile', () => {
    const state: DeepPartial<IProfileSchema> = { form: { username: '123' } };

    expect(profileReducer(
      state as IProfileSchema,
      profileActions.updateProfile({
        username: '123456',
      }),
    ))
      .toEqual({
        form: { username: '123456' },
      });
  });
  test('test update profile service pending', () => {
    const state: DeepPartial<IProfileSchema> = {
      isLoading: false,
    };

    expect(profileReducer(
      state as IProfileSchema,
      updateProfileData.pending,
    ))
      .toEqual({
        isLoading: true,
        validateErrors: undefined,
      });
  });
  test('test update profile service fullfiled', () => {
    const state: DeepPartial<IProfileSchema> = {
      isLoading: true,
    };

    expect(profileReducer(
      state as IProfileSchema,
      updateProfileData.fulfilled(profileDataMock, ''),
    ))
      .toEqual({
        isLoading: false,
        validateErrors: undefined,
        readonly: true,
        validateError: undefined,
        form: profileDataMock,
        data: profileDataMock,
      });
  });
});
