import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';

const ns = ['translation'];
const supportedLngs = ['de'];

i18n.use(initReactI18next)
    .init({
        //debug: true,
        lng: 'de',
        fallbackLng: 'de',
        ns,
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
        supportedLngs,
    });

supportedLngs.forEach((lang) => {
    ns.forEach((n) => {
        i18n.addResourceBundle(
            lang,
            n,
            require(`../src/assets/i18n/${lang}.json`)
        );
    });
});

export {i18n}