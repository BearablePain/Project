import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ISidebarItem } from 'widgets/Sidebar/model/item';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: ISidebarItem;
  collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item: { path, Icon, text }, collapsed } = props;
  const t = useTAddNs('SidebarItem');

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
