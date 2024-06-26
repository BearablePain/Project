import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IComment } from 'entities/Comment';
import { IStateSchema } from 'app/providers/StoreProvider';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { IArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';

const commentsAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment.id,
}); //

export const getArticleComments = commentsAdapter.getSelectors<IStateSchema>(
  (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<IArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (
        state,
        action: PayloadAction<IComment[]>,
      ) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
