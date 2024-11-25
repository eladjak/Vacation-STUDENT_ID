import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import heTranslations from './he.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: {
        translation: heTranslations
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
  });

export default i18n; 