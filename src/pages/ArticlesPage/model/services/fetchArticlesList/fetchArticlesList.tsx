import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { ArticleType, IArticle } from 'entities/Article';
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';

interface IFetchArticleListProps {
  replace?: boolean;

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
      const limit = getArticlesPageLimit(getState());
      const sort = getArticlesPageSort(getState());
      const order = getArticlesPageOrder(getState());
      const search = getArticlesPageSearch(getState());
      const page = getArticlesPageNum(getState());
      const type = getArticlesPageType(getState());
      try {
        const params = {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type,

        };
        addQueryParams({
          sort,
          order,
          search,
          type,
        });

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
