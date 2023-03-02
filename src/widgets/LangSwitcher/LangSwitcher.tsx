import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

const LANGUAGE_TOGGLE_MAP = {
  ru: 'en',
  en: 'ru',
} as const;

interface LangSwitcherProps {
  className?: string;
  short: boolean;
}
export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
  const { className, short } = props;
  const { t, i18n } = useTranslation();

  type LANGUAGE = keyof typeof LANGUAGE_TOGGLE_MAP;
  const toggle = async () => {
    await i18n.changeLanguage(LANGUAGE_TOGGLE_MAP[i18n.language as LANGUAGE]);
  };

  return (
    <Button
      className={classNames('', {}, [className])}
      onClick={toggle}
      theme={ButtonTheme.CLEAR}
    >
      {short ? t('Короткий язык') : t('Язык')}

    </Button>
  );
};
