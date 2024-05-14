import { ILoginSchema } from 'features/AuthByUsername/model/types/ILoginSchema';
import { ICounterSchema } from 'entities/Counter';
import { IUserSchema } from 'entities/User';
import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { IProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { IArticleDetailsSchema } from 'entities/Article';
import { IAddCommentFormSchema } from 'features/addCommentForm/model/types/IAddCommentFormSchema';
import { IArticlesPageSchema } from 'pages/ArticlesPage/model/types/IArticlePageSchema';
import { IUISchema } from 'features/UI/model/types/IUISchema';
import { IArticleDetailsPageSchema } from 'pages/ArticleDetailsPage/model/types/IArticleDetailsPageSchema';

export interface IStateSchema {
  counter: ICounterSchema;
  user: IUserSchema;
  ui: IUISchema;
  // Асинхронные редюсеры
  loginForm?: ILoginSchema;
  profile?: IProfileSchema;
  articleDetails?: IArticleDetailsSchema;
  addCommentForm?: IAddCommentFormSchema;
  articlesPage?: IArticlesPageSchema;
  articleDetailsPage?: IArticleDetailsPageSchema;
}

export type TStateSchemaKey = keyof IStateSchema;
export type TMountedReducers = OptionalRecord<TStateSchemaKey, boolean>;

export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IStateSchema>;
  reduce: (state: IStateSchema, action: AnyAction) => CombinedState<IStateSchema>;
  add: (key: TStateSchemaKey, reducer: Reducer) => void;
  remove: (key: TStateSchemaKey) => void;
  // true = inited,
  getMountedReducers: () => TMountedReducers;
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager;
}

export interface IThunkExtraArg {
  api: AxiosInstance;
}

export interface IThunkConfig<T> {
  rejectValue: T;
  extra: IThunkExtraArg;
  state: IStateSchema;
}
