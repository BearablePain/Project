import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { useMount } from 'shared/lib/hooks/useMount/useMount';
import AddCommentForm from 'features/addCommentForm/ui/AddCommentForm';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/articleDetailComments';
import { Page } from 'widgets/Page/Page';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsPageReducer';
import { getArticleRecommendations } from 'pages/ArticleDetailsPage/model/slices/articleDetailsPageRecommendationsSlice.ts';
import { getArticleRecommendationsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/recommendations';
import { fetchArticleRecommendations } from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticlesDetailPageHeader } from 'pages/ArticleDetailsPage/ui/ArticlesDetailPageHeader/ArticlesDetailPageHeader';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

interface IArticleDetailsPageProps {
  className?: string;
}

const reducers: TReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};
const ArticleDetailsPage: FC<IArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const t = useTAddNs('ArticleDetailsPage');
  const dispatch = useDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  const { id } = useParams<{ id: string }>();

  useDynamicReducerLoader({
    reducers,
    removeAfterUnmount: true,
  });

  useMount(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    );
  }

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticlesDetailPageHeader />
      <ArticleDetails id={id} />
      <Text title={t('Рекомендуем')} className={cls.title} />
      <ArticleList articles={recommendations} className={cls.recommendations} target="_blank" />
      <Text size={TextSize.L} title={t('Комментарии')} className={cls.title} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList comments={comments} isLoading={commentsIsLoading} />
    </Page>
  );
};

export default memo(ArticleDetailsPage);
