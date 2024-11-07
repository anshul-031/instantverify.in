import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // English translations
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success',
      },
      auth: {
        login: 'Login',
        signup: 'Sign Up',
        logout: 'Logout',
        email: 'Email',
        password: 'Password',
      },
      // Add more translations
    },
  },
  hi: {
    translation: {
      // Hindi translations
      common: {
        loading: 'लोड हो रहा है...',
        error: 'एक त्रुटि हुई',
        success: 'सफल',
      },
      auth: {
        login: 'लॉग इन करें',
        signup: 'साइन अप करें',
        logout: 'लॉग आउट',
        email: 'ईमेल',
        password: 'पासवर्ड',
      },
      // Add more translations
    },
  },
  // Add more languages
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;