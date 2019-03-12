import i18n from 'i18next'

import resources from './resources'

// this module isn't quite compliant, so it's gotta be imported like this to work
const LanguageDetector = require('i18next-browser-languagedetector')

i18n
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en-US',
    fallbackLng: 'en',
    ns: ['ualcore'], // namespaces to load
    defaultNS: 'ualcore', // defaults to 'translation'

    interpolation: {
      escapeValue: false,
    },

    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },
  })
  .catch(e => console.warn(e))

export default i18n
