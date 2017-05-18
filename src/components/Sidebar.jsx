import styles from '../styles/sidebar'

import React, { Component } from 'react'

import Nav from '../components/Nav'

class Sidebar extends Component {
  render () {
    return <aside className={styles.sidebar}>
      <Nav />
    </aside>
  }
}

export default Sidebar
