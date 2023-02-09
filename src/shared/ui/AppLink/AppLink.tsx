import {classNames} from "shared/lib/classNames/classNames";
import style from './AppLink.module.scss';
import {FC} from 'react'
import { Link } from "react-router-dom";

export enum AppLinkTheme {
    PRIMARY='primary',
 SECONDARY = 'secondary'
}

interface AppLinkProps {
    className?: string;
    to: string
    theme?: AppLinkTheme
}
export const AppLink: FC<AppLinkProps> = (props) => {
const {className, children, to, theme= AppLinkTheme.PRIMARY} = props
    return (
        <Link className={classNames(style.navbar,  {}, [className, style[theme]], )} to={to}>
            {children}
        </Link>
    );
};
