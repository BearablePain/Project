import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

const AboutPage = () => {
  const { t } = useTranslation('about');
  const TEXT = {
    ABOUT: t('О сайте', { ns: 'about' }),
  };
  return <Page>{TEXT.ABOUT}</Page>;
};

export default AboutPage;
