import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useMount } from 'shared/lib/hooks/useMount/useMount';
import { getArticlesPageIsLoading, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

const reducers: TReducerList = {
  articlesPage: articlesPageReducer,
};

interface ArticlesPageProps {
  className?: string;
}

export const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  useDynamicReducerLoader({ reducers });
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);
  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
    console.log('next');
  }, [dispatch]);

  useMount(() => {
    dispatch(initArticlesPage());
  });

  return (
    <Page
      onScrollEnd={onLoadNextPart}
      className={classNames(cls.ArticlesPage, {}, [className])}
    >
      <ArticleViewSelector view={view} onViewClick={onChangeView} />
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
      />
    </Page>

  );
};

export default memo(ArticlesPage);
