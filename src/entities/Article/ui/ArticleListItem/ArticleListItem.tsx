import { classNames } from 'shared/lib/classNames/classNames';
import { FC, useCallback } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Card } from 'shared/ui/Card/Card';
import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleListItem.module.scss';
import {
  ArticleBlockType, ArticleView, IArticle, IArticleTextBlock,
} from '../../model/types/article';

interface ArticleListItemProps {
  className?: string;
  article: IArticle;
  view: ArticleView;

}

export const ArticleListItem: FC<ArticleListItemProps> = (props) => {
  const {
    className,
    article,
    view = ArticleView.SMALL,
  } = props;
  const t = useTAddNs('ArticleListItem');
  const navigate = useNavigate();

  const types = <Text text={article.type.join(', ')} className={cls.types} />;

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [article.id, navigate]);

  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  const textBlock = article.blocks.find(
    (block) => block.type === ArticleBlockType.TEXT,
  ) as IArticleTextBlock;

  const RENDER_MAP = {
    [ArticleView.BIG]: (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE}>
              {t('Читать далее...')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    ),
    [ArticleView.SMALL]:
  <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
    <Card onClick={onOpenArticle} className={cls.card}>
      <div className={cls.imageWrapper}>
        <img alt={article.title} src={article.img} className={cls.img} />
        <Text text={article.createdAt} className={cls.date} />
      </div>
      <div className={cls.infoWrapper}>
        {types}
        {views}
      </div>
      <Text text={article.title} className={cls.title} />
    </Card>
  </div>,
  };

  return <div>{RENDER_MAP[view]}</div>;
};
