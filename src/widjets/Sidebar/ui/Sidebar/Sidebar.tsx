import {classNames} from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import {FC} from 'react'
import { useState } from "react";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { ThemeSwitcher } from "shared/ThemeSwitcher";
interface SidebarProps {
    className?: string;
}
export const Sidebar: FC<SidebarProps> = (props) => {
    const {className} = props
    const [collapsed, setCollapsed] = useState(false)
    const onToggle = () => {
        setCollapsed((prev => !prev))
    }
    return (
        <div className={classNames (cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
            <button onClick={onToggle}>toggle</button>
            <div className={cls.switchers}> <ThemeSwitcher /></div>
        </div>
    );
};
