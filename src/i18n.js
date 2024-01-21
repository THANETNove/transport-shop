// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationTh from "./locales/th/translation.json";
import translationEn from "./locales/en/translation.json";
import translationCh from "./locales/ch/translation.json";

const savedLanguage = localStorage.getItem("i18nextLng");

i18n.use(initReactI18next).init({
  resources: {
    th: {
      translation: translationTh,
    },
    en: {
      translation: translationEn,
    },
    ch: {
      translation: translationCh,
    },
    // Add more languages if needed
  },
  lng: savedLanguage || "th", // Use the saved language or default to "th"
  fallbackLng: "th",
  interpolation: {
    escapeValue: false,
  },
});

// Update localStorage when the language changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
