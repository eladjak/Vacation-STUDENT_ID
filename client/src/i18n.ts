import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: {
        translation: {
          // כאן נוסיף את כל המחרוזות שלנו
          'Follow': 'עקוב',
          'Price': 'מחיר',
          'Dates': 'תאריכים'
        }
      }
    },
    lng: 'he',
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
