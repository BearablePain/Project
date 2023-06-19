import { IStateSchema } from 'app/providers/StoreProvider';
import { profileDataMock } from 'shared/const/profileDataMock';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
  test('should return error', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        form: profileDataMock,
      },
    };
    expect(getProfileForm(state as IStateSchema))
      .toEqual(profileDataMock);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {};
    expect(getProfileForm(state as IStateSchema))
      .toEqual(undefined);
  });
});
