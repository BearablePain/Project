import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { IComment } from 'entities/Comment';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: IComment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const {
    className,
    isLoading,
    comments,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.comment, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            className={cls.comment}
            comment={comment}
          />
        ))
        : <Text text={t('Комментарии отсутствуют')} />}
    </div>
  );
});
