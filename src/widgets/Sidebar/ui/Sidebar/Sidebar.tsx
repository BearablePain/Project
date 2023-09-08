import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { ThemeSwitcher } from 'shared/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher/LangSwitcher';
import { SidebarItem } from 'widgets/Sidebar/ui/SideBarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const sideBarItemList = useSelector(getSidebarItems);
  const itemsList = useMemo(() => sideBarItemList.map((item) => (
    <SidebarItem
      item={item}
      collapsed={collapsed}
      key={item.path}
    />
  )), [collapsed, sideBarItemList]);
  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.items}>
        {itemsList}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher
          short={collapsed}
          className={cls.lang}
        />
      </div>
    </div>
  );
});
