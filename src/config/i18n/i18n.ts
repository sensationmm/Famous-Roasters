import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  de: {
    translation: require('src/assets/i18n/de.json'),
  },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'de',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
})

export default i18n
