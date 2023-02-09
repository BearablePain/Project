import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import style from './Navbar.module.scss'
import { ThemeSwitcher } from "shared/ThemeSwitcher";

interface NavbarProps {
     className?: string;
 }


 export const Navbar = ({className}: NavbarProps) => {
     return (
         <div className={classNames (style.navbar, {}, [className])}>
             <div className={style.links}>
    <AppLink to={'./'}  theme={AppLinkTheme.SECONDARY}>Главная</AppLink>
    <AppLink to={'./about'}  theme={AppLinkTheme.SECONDARY}>О сайте</AppLink></div>

 </div>
     );
 };
