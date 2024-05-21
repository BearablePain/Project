import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useMount } from 'shared/lib/hooks/useMount/useMount';
import { ArticlesPageFilters } from 'pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters';
import { useSearchParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
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
  useDynamicReducerLoader({
    reducers,
    removeAfterUnmount: false,
  });
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useMount(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <Page
      onScrollEnd={onLoadNextPart}
      className={classNames(cls.ArticlesPage, {}, [className])}
    >
      <ArticlesPageFilters />

      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
        className={cls.list}
      />
    </Page>

  );
};

export default memo(ArticlesPage);
