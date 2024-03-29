import { EntityState } from '@reduxjs/toolkit';
import {
  ArticleSortField, ArticleType, ArticleView, IArticle,
} from 'entities/Article';
import { SortOrder } from 'shared/types/SortOrder';

export interface IArticlesPageSchema extends EntityState<IArticle> {
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;
  // filters
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
