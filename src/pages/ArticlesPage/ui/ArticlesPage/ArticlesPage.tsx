import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo } from 'react';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

export const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])} />
  );
};
export default memo(ArticlesPage);
