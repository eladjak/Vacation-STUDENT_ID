import { TranslationsType } from '../i18n/translations';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationsType;
    };
  }
} 