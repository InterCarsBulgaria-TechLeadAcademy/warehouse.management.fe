import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'

import bg from '@/lang/bg.json'

const resources: Resource = {
  bg: {
    translation: bg
  }
}
// use this as an example of how to create a json file for translations and different pages
// it doesnt matter that the project is written in vue, the idea is the same
// https://github.com/vuestorefront/storefront-nuxt3-boilerplate/blob/develop/apps/web/lang/en.json
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'bg',
    fallbackLng: 'bg',

    interpolation: {
      escapeValue: false
    }
  })

export default i18n
