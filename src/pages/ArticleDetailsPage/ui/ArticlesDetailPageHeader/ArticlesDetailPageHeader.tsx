import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo, useCallback } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import getCanEditArticle from 'pages/ArticleDetailsPage/model/selectors/article';
import cls from './ArticlesDetailPageHeader.module.scss';

interface ArticlesDetailPageHeaderProps {
  className?: string;
}

export const ArticlesDetailPageHeader: FC<ArticlesDetailPageHeaderProps> = (props) => {
  const { className } = props;
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);
  const t = useTAddNs('ArticlesDetailPageHeader');
  const navigate = useNavigate();
  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);
  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);
  return (
    <div className={classNames(cls.ArticlesDetailPageHeader, {}, [className])}>
      <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>
      {canEdit && (
        <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
          {t('Редактировать')}
        </Button>
      )}
    </div>
  );
};
export default memo(ArticlesDetailPageHeader);
