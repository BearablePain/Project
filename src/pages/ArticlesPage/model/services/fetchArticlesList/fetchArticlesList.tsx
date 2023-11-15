import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';
import { IBaseListPaginationProps } from 'shared/types/IBaseListPaginationProps';
import { getArticlesPageLimit, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';

interface IFetchArticleListProps extends IBaseListPaginationProps {
}

export const fetchArticlesList = createAsyncThunk<IArticle[],
  IFetchArticleListProps,
  IThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (props, thunkApi) => {
      const {
        extra,
        rejectWithValue,
        getState,
      } = thunkApi;
      const { page = 1 } = props;
      const limit = getArticlesPageLimit(getState());
      console.log(getArticlesPageView(getState()), 'getArticlesPageView(getState())getArticlesPageView(getState())getArticlesPageView(getState())');
      try {
        const params = {
          _expand: 'user',
          _limit: limit,
          _page: page,
        };
        const response = await extra.api.get<IArticle[]>('/articles', {
          params,
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
