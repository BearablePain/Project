import { EntityState } from '@reduxjs/toolkit';
import { ArticleView, IArticle } from 'entities/Article';
import { LIMIT_PAGINATION_DEFAULT } from 'shared/const/paginationLimit';

export interface IArticlesPageSchema extends EntityState<IArticle> {
  isLoading?: boolean;
  error?: string;
  view: ArticleView;
  // pagination
  page: number;
  limit?: LIMIT_PAGINATION_DEFAULT;
  hasMore: boolean;
  _inited: boolean;
}
