import { useTranslation as useI18nTranslation } from 'react-i18next';
import type { TranslationKey } from '../types/i18n';

export const useTranslation = () => {
  const { t: translate, ...rest } = useI18nTranslation();
  
  const t = (key: TranslationKey) => translate(key);
  
  return { t, ...rest };
}; 