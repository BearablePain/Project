import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './LangSwitcher.module.scss';

const LANGUAGE_TOGGLE_MAP = {
  ru: 'en',
  en: 'ru',
} as const;

interface LangSwitcherProps {
  className?: string;
}
export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
  const { className } = props;
  const { t, i18n } = useTranslation();

  type LANGUAGE = keyof typeof LANGUAGE_TOGGLE_MAP;
  const toggle = async () => {
    await i18n.changeLanguage(LANGUAGE_TOGGLE_MAP[i18n.language as LANGUAGE]);
  };

  return (
    <Button
      className={classNames(cls.LangSwitcher, {}, [className])}
      onClick={toggle}
      theme={ThemeButton.CLEAR}
    >
      {t('Язык')}
    </Button>
  );
};
