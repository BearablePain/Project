import { IStateSchema } from 'app/providers/StoreProvider';
import { profileDataMock } from 'shared/const/profileDataMock';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
  test('should return error', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        data: profileDataMock,
      },
    };
    expect(getProfileData(state as IStateSchema))
      .toEqual(profileDataMock);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {};
    expect(getProfileData(state as IStateSchema))
      .toEqual(undefined);
  });
});
