import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Translations } from './types/i18n';
import heTranslations from './locales/he.json';
import enTranslations from './locales/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: Translations;
    };
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: {
        translation: heTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: 'he',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;


