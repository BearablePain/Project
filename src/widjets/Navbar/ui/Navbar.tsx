import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import style from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}
export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation('main');

  const TEXT = {
    MAIN: t('Главная', { ns: 'main' }),
    ABOUT: t('О сайте', { ns: 'main' }),
    A: 'Ассы',
  };

  return (
    <div className={classNames(style.navbar, {}, [className])}>
      <div className={style.links}>
        <AppLink to="./" theme={AppLinkTheme.SECONDARY}>
          {TEXT.MAIN}
        </AppLink>
        <AppLink to="./about" theme={AppLinkTheme.SECONDARY}>
          {TEXT.ABOUT}
        </AppLink>
      </div>
    </div>
  );
};
