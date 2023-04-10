import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IProfile } from 'entities/Profile';

export const fetchProfileData = createAsyncThunk<
    IProfile,
    void,
  IThunkConfig<string>
    >(
      'profile/fetchProfileData',
      // eslint-disable-next-line consistent-return
      async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
          const a = 1;
        } catch (e) {
          console.log(e);
          return rejectWithValue('error');
        }
      },
    );
