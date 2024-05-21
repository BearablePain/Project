import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

const MainPage = () => {
  const { t } = useTranslation('main');
  const TEXT = {
    MAIN: t('Главная', { ns: 'main' }),
  };
  return (
    <Page>
      {TEXT.MAIN}
    </Page>
  );
};

export default MainPage;
