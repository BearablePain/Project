import { IStateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article/model/types/article';

export const getArticlesPageIsLoading = (state: IStateSchema) => state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: IStateSchema) => state.articlesPage?.error;
export const getArticlesPageView = (state: IStateSchema) => state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageNum = (state: IStateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: IStateSchema) => state.articlesPage?.limit;
export const getArticlesPageHasMore = (state: IStateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (state: IStateSchema) => state.articlesPage?._inited;
