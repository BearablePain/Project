import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IStateSchema } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';
import { IArticlesPageSchema } from 'pages/ArticlesPage/model/types/IArticlePageSchema';
import { ArticleView } from 'entities/Article/model/types/article';
import { ARCTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { limitBigDefault, limitSmallDefault } from 'shared/const/paginationLimit';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: (article) => article.id,
}); //

export const getArticles = articlesAdapter.getSelectors<IStateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);
const articlesPageSlice = createSlice({
  name: 'articlePageSlice',
  initialState: articlesAdapter.getInitialState<IArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    page: 1,
    view: ArticleView.SMALL,
    hasMore: true,
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARCTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      console.log(state, 'setPagesetPagesetPagesetPagesetPagesetPagesetPagesetPagesetPage');
      state.page = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(ARCTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.BIG ? limitBigDefault : limitSmallDefault;
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticlesList.fulfilled, (
        state,
        action: PayloadAction<IArticle[]>,
      ) => {
        state.isLoading = false;
        articlesAdapter.setMany(state, action.payload);
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reducer: articlesPageReducer,
  actions: articlesPageActions,
} = articlesPageSlice;
