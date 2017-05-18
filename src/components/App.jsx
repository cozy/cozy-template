import React from 'react'

import Sidebar from './Sidebar'

import { Route, Switch } from 'react-router-dom'

import Contrats from './Contrats'
import Sinistres from './Sinistres'
import Infos from './Infos'
import Foyer from './Foyer'

import styles from '../styles/app.styl'

const App = ({ children }) => {
  return <div className={ styles.appWrapper }>
    <Sidebar />
    <main className={ styles.appContent }>
      <Switch>
        <Route path='/contrats' component={Contrats} />
        <Route path='/sinistres' component={Sinistres} />
        <Route path='/infos' component={Infos} />
        <Route path='/foyer' component={Foyer} />
      </Switch>
    </main>
  </div>
}

export default App
