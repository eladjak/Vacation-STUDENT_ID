import { useTranslation as useI18nTranslation } from 'react-i18next';
import { TOptions } from 'i18next';
import type { TranslationKey } from '../i18n/translations';
import logger from '../utils/logger';

interface UseTranslationReturn {
  t: (key: TranslationKey, options?: TOptions) => string;
  i18n: {
    language: string;
    changeLanguage: (lng: string) => Promise<string>;
  };
}

export const useTranslation = (): UseTranslationReturn => {
  const { t: translate, i18n } = useI18nTranslation();
  
  const t = (key: TranslationKey, options?: TOptions): string => {
    try {
      const translation = translate(key, {
        defaultValue: key,
        ...options
      });
      
      if (typeof translation !== 'string') {
        logger.error('תרגום לא תקין:', { key, translation });
        return key;
      }
      
      return translation;
    } catch (error) {
      logger.error('שגיאה בתרגום:', { key, error });
      return key;
    }
  };

  const changeLanguage = async (lng: string): Promise<string> => {
    await i18n.changeLanguage(lng);
    return lng;
  };

  return { 
    t,
    i18n: {
      language: i18n.language,
      changeLanguage
    }
  };
}; 