import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ISidebarItem } from 'widgets/Sidebar/model/types/item';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: ISidebarItem;
  collapsed: boolean;

}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const {
    item: {
      path,
      Icon,
      text,
      authOnly,
    },
    collapsed,
  } = props;
  const isAuth = useSelector(getUserAuthData);
  const t = useTAddNs('SidebarItem');

  if (authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
    >
      <Icon className={cls.icon} />
      <span className={cls.link}>
        {t(text)}
      </span>
    </AppLink>
  );
});
