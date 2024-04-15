import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./translations/en.json";
import translationFR from "./translations/fr.json";

type TranslationResources = {
  [key: string]: {
    translation: {
      // This is the standard key for namespace in i18next configurations.
      [key: string]: string;
    };
  };
};

const resources: TranslationResources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // detect user language
  .init({
    resources,
    fallbackLng: "en", // use en if detected lng is not available

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
