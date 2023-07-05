import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo, useEffect } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { useSelector } from 'react-redux';
import { ComponentState } from 'shared/const/componentState';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import useRenderBlock from 'entities/Article/model/hooks/useRenderBlock';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import cls from './ArticleDetails.module.scss';

const getStateComponent = ({
  error,
  isLoading,
}: { error: string | undefined, isLoading: boolean }): ComponentState => {
  if (isLoading) {
    return ComponentState.isLoading;
  }
  if (error) {
    return ComponentState.error;
  }
  return ComponentState.normal;
};

interface IArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: TReducerList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<IArticleDetailsProps> = (props) => {
  const {
    className,
    id,
  } = props;

  const dispatch = useAppDispatch();
  const t = useTAddNs('ArticleDetails');
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const {
    img,
    subtitle,
    title,
    createdAt,
    views = '',
    blocks = [],
  } = useSelector(getArticleDetailsData) || {};
  const error = useSelector(getArticleDetailsError);
  const stateComponent = getStateComponent({
    error,
    isLoading,
  });
  const renderBlock = useRenderBlock();
  useDynamicReducerLoader({
    reducers,
    removeAfterUnmount: true,
  });

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  const RENDER_COMPONENT_MAP = {
    [ComponentState.isLoading]: (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    ),
    [ComponentState.error]: <Text
      align={TextAlign.CENTER}
      title={t('Произошла ошибка при загрузке статьи.')}
    />,
    [ComponentState.normal]: (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar size={200} src={img} className={cls.avatar} />
        </div>
        <Text title={title} text={subtitle} className={cls.title} />
        <div className={cls.articleInfo}>
          <Icon className={cls.icon} Svg={EyeIcon} />
          <Text text={`${views}`} />
        </div>
        <div className={cls.articleInfo}>
          <Icon className={cls.icon} Svg={CalendarIcon} />
          <Text text={createdAt} />
        </div>
        {blocks.map(renderBlock)}
      </>),
  };
  const Component = RENDER_COMPONENT_MAP[stateComponent];
  return (
    <div className={classNames(cls.ArticleDetails, {}, [className])}>{Component}</div>
  );
};

export default memo(ArticleDetails);
