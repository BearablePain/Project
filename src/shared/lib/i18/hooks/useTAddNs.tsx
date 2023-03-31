import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useTAddNs = (nsName: string) => {
  const { t } = useTranslation();
  return useCallback((text: string) => t(text, { ns: nsName }), [nsName, t]);
};
