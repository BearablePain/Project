import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { profileDataMock } from 'shared/const/profileDataMock';
import { updateProfileData } from 'entities/Profile';

describe('updateProfileData.test', () => {
  const id = '1';

  test('success', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: profileDataMock,
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data: profileDataMock }));

    const result = await thunk.callThunk(id);

    expect(thunk.api.put)
      .toHaveBeenCalled();
    expect(result.meta.requestStatus)
      .toBe('fulfilled');
    expect(result.payload)
      .toEqual(profileDataMock);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: profileDataMock,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(id);

    expect(result.meta.requestStatus)
      .toBe('rejected');
    expect(result.payload);
  });
});
