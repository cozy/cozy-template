/* global cozy */

import 'babel-polyfill'

import './styles/main'

import React from 'react'
import { render } from 'react-dom'

const renderApp = function () {
  const Root = require('./components/Root').default
  render(<Root />, document.querySelector('[role=application]'))
}

if (module.hot) {
  module.hot.accept('./components/Root', () => requestAnimationFrame(renderApp))
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  })

  cozy.bar.init({
    appName: data.cozyAppName,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale,
    replaceTitleOnMobile: true
  })

  renderApp()
})
