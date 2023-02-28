import React from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation('main');
  const TEXT = {
    MAIN: t('Главная', { ns: 'main' }),
  };
  return (
    <div>
      {TEXT.MAIN}
    </div>
  );
};

export default MainPage;
