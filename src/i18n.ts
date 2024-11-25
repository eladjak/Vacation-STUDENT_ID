import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import heTranslation from './locales/he/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: {
        translation: heTranslation
      }
    },
    lng: 'he',
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 