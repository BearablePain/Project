import { classNames } from 'shared/lib/classNames/classNames';
import { FC, HTMLAttributeAnchorTarget } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Card } from 'shared/ui/Card/Card';
import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './ArticleListItem.module.scss';
import {
  ArticleBlockType, ArticleView, IArticle, IArticleTextBlock,
} from '../../model/types/article';

interface ArticleListItemProps {
  className?: string;
  article: IArticle;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;

}

export const ArticleListItem: FC<ArticleListItemProps> = (props) => {
  const {
    className,
    article,
    view = ArticleView.SMALL,
    target,
  } = props;
  const t = useTAddNs('ArticleListItem');

  const types = <Text text={article.type.join(', ')} className={cls.types} />;

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
            <Avatar size={30} src={article?.user?.avatar} />
            <Text text={article?.user?.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <AppLink to={RoutePath.article_details + article} target={target}>
              <Button theme={ButtonTheme.OUTLINE}>
                {t('Читать далее...')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    ),
    [ArticleView.SMALL]:
  <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
    <AppLink to={RoutePath.article_details + article.id} target={target}>
      <Card className={cls.card}>
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
    </AppLink>
  </div>,
  };

  return <div>{RENDER_MAP[view]}</div>;
};
