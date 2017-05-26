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

document.addEventListener('DOMContentLoaded', renderApp)
