import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation('about');
  const TEXT = {
    ABOUT: t('О сайте', { ns: 'about' }),
  };
  return <div>{TEXT.ABOUT}</div>;
};

export default AboutPage;
