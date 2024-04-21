import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import axios from 'axios';

const langVn = {};
const langEn = {};
const langJp = {};

axios
    .get('https://api.languages.itomo.vn/get/all')
    .then((response) => {
        response.data.forEach((element) => {
            langEn[element.language_key] = element.en;
            langJp[element.language_key] = element.ja;
            langVn[element.language_key] = element.vi;
        });
    })
    .catch((error) => {
        console.error('Error when call API:', error);
    });

// the translations
const resources = {
    jp: {
        translation: langJp
    },
    vn: {
        translation: langVn
    },
    eng: {
        translation: langEn
    }
};

const language = localStorage.getItem('I18N_LANGUAGE');
if (!language) {
    localStorage.setItem('I18N_LANGUAGE', 'en');
}
i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem('I18N_LANGUAGE') || 'en',
        fallbackLng: 'en', // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
