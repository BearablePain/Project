import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useMount } from 'shared/lib/hooks/useMount/useMount';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/articleDetailComments';

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
      <ArticleDetails id={id} />
      <Text title={t('Комментарии')} className={cls.commentTitle} />
      <CommentList comments={comments} isLoading={commentsIsLoading} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
