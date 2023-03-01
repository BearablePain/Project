import { classNames } from 'shared/lib/classNames/classNames';
import style from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}
export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(style.navbar, {}, [className])}>
    <div className={style.links} />
    /
  </div>
);
