import { IArticleDetailsPageSchema } from 'pages/ArticleDetailsPage/model/types/IArticleDetailsPageSchema';
import { articleDetailsPageRecommendationsReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsPageRecommendationsSlice.ts';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const articleDetailsPageReducer = combineReducers<IArticleDetailsPageSchema>({
  recommendations: articleDetailsPageRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
});
