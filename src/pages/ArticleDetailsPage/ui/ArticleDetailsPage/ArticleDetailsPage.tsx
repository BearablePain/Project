import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { useMount } from 'shared/lib/hooks/useMount/useMount';
import AddCommentForm from 'features/addCommentForm/ui/AddCommentForm';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/articleDetailComments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

interface IArticleDetailsPageProps {
  className?: string;
}

const reducers: TReducerList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};
const ArticleDetailsPage: FC<IArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const t = useTAddNs('ArticleDetailsPage');
  const dispatch = useDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const navigate = useNavigate();
  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

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
  });

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>
      <ArticleDetails id={id} />
      <Text title={t('Комментарии')} className={cls.commentTitle} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList comments={comments} isLoading={commentsIsLoading} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
