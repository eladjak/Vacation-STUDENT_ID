import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './he.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: translations
    },
    lng: 'he',
    fallbackLng: 'he',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 