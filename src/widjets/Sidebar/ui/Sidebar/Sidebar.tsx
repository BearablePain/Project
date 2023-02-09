import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { FC } from 'react';
import { useState } from 'react';
import { ThemeSwitcher } from 'shared/ThemeSwitcher';
import { LangSwitcher } from 'widjets/LangSwitcher/LangSwitcher';
import { Button } from 'shared/ui/Button/Button';
interface SidebarProps {
  className?: string;
}
export const Sidebar: FC<SidebarProps> = (props) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button onClick={onToggle}>toggle</Button>
      <div className={cls.switchers}>
        {' '}
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
      </div>
    </div>
  );
};