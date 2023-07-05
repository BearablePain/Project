import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IProfile } from 'entities/Profile';

export const fetchProfileData = createAsyncThunk<IProfile,
  void,
  IThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkApi) => {
      const {
        extra,
        rejectWithValue,
      } = thunkApi;

      try {
        const response = await extra.api.get<IProfile>('/profile');
        if (!response.data) {
          throw new Error();
        }
        return response.data;
      } catch (e) {
        console.log(e);
        return rejectWithValue('error');
      }
    },
  );
