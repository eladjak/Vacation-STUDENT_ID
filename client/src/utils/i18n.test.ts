import { Translations } from '../types/i18n';
import heTranslations from '../locales/he.json';
import enTranslations from '../locales/en.json';

describe('i18n translations', () => {
  it('should have matching keys in both languages', () => {
    const heKeys = Object.keys(heTranslations).sort();
    const enKeys = Object.keys(enTranslations).sort();
    expect(heKeys).toEqual(enKeys);
  });

  it('should match the Translations type', () => {
    const translations: Translations = heTranslations;
    expect(translations).toBeDefined();
  });
}); 