import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useMount } from 'shared/lib/hooks/useMount/useMount';
import { getArticlesPageIsLoading, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
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
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);
  useMount(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  });
  useDynamicReducerLoader({ reducers });

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleViewSelector view={view} onViewClick={onChangeView} />
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
      />
    </div>
  );
};

export default memo(ArticlesPage);
