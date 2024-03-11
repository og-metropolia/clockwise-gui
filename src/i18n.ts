import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fi from './locales/fi.json';
import sv from './locales/sv.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'ns1',
  detection: {
    order: ['cookie', 'queryString', 'navigator'],
    lookupCookie: 'language',
    caches: ['cookie'],
    cookieOptions: {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
    },
    checkOnLoad: true,
  },
  resources: {
    en: {
      ns1: en,
    },
    fi: {
      ns1: fi,
    },
    sv: {
      ns1: sv,
    },
  },
});

export default i18n;
