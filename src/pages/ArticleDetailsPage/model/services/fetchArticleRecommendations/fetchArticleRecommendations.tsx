import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';
import { RECOMMENDATION_LIMIT } from 'pages/ArticleDetailsPage/model/const/RECOMMENDATION_LIMIT';

export const fetchArticleRecommendations = createAsyncThunk<IArticle[],
  void,
  IThunkConfig<string>>(
    'articleDetailsPage/fetchArticleRecommendations',
    async (props, thunkApi) => {
      const {
        extra,
        rejectWithValue,
      } = thunkApi;

      try {
        const response = await extra.api.get<IArticle[]>('/articles', {
          params: {
            _limit: RECOMMENDATION_LIMIT,
            _expand: 'user',
          },
        });

        if (!response.data) {
          throw new Error();
        }

        return response.data;
      } catch (e) {
        return rejectWithValue('error');
      }
    },
  );
