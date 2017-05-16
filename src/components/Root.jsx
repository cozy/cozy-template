import React from 'react'
import { I18n } from '../lib/I18n'

import App from './App'

const context = window.context
const lang = document.documentElement.getAttribute('lang') || 'en'

const Root = function () {
  return <I18n context={context} lang={lang}>
    <App />
  </I18n>
}

export default Root
