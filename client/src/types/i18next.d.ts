import 'i18next';
import { translations } from '../i18n/translations';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof translations.he;
    };
  }
} 