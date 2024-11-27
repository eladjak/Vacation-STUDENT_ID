import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';
import logger from '../utils/logger';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      he: {
        translation: translations.he
      }
    },
    lng: 'he',
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })
  .catch((error: Error) => {
    logger.error('שגיאה באתחול i18n:', error);
  });

export default i18next; 