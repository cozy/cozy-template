import React from 'react'
import { I18n } from '../lib/I18n'

// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import appReducers from '../reducers'

// Router
import { HashRouter } from 'react-router-dom'

import App from './App'

const context = window.context
const lang = document.documentElement.getAttribute('lang') || 'en'

const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  appReducers,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ))
)

const Root = function () {
  return <Provider store={store}>
    <I18n context={context} lang={lang}>
      <HashRouter>
        <App />
      </HashRouter>
    </I18n>
  </Provider>
}

export default Root
