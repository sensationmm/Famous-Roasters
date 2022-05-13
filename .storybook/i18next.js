import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';

const ns = ['common'];
const supportedLngs = ['de'];

i18n.use(initReactI18next)
    .init({
        //debug: true,
        lng: 'de',
        fallbackLng: 'de',
        interpolation: {
            escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
        defaultNS: 'common',
        ns,
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