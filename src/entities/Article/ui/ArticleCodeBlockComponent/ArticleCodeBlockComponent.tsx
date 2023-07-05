import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Code } from 'shared/ui/Code/Code';
import cls from './ArticleCodeBlockComponent.module.scss';
import { IArticleCodeBlock } from '../../model/types/article';

interface IArticleCodeBlockComponentProps {
  className?: string;
  block: IArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: IArticleCodeBlockComponentProps) => {
  const {
    className,
    block,
  } = props;

  return (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
});
