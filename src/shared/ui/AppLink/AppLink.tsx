import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import style from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY='primary',
    SECONDARY = 'secondary',
    RED='red'
}

interface AppLinkProps {
    className?: string;
    to: string
    theme?: AppLinkTheme;
    children?: ReactNode;
}
export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
  const {
    className, children, to, theme = AppLinkTheme.PRIMARY,
  } = props;
  return (
    <Link className={classNames(style.navbar, {}, [className, style[theme]])} to={to}>
      {children}
    </Link>
  );
});
