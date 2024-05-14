import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IArticle } from 'entities/Article';
import { IStateSchema } from 'app/providers/StoreProvider';
import { IArticleDetailsRecommendationsSchema } from 'pages/ArticleDetailsPage/model/types/IArticleDetailsRecommendationsSchema';
import { fetchArticleRecommendations } from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<IArticle>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<IStateSchema>(
  (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const initialState = {
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
};

const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendationsSlice',
  initialState: recommendationsAdapter.getInitialState<IArticleDetailsRecommendationsSchema>(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (
        state,
        action,
      ) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reducer: articleDetailsPageRecommendationsReducer,
} = articleDetailsPageRecommendationsSlice;
