import styles from '../styles/nav'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from '../lib/I18n'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Spinner from '../components/Spinner'

import filesIcon from 'file!../assets/icons/16/icon-files-16.svg'
import homeIcon from 'file!../assets/icons/16/icon-home-16.svg'
import accountIcon from 'file!../assets/icons/16/icon-account-16.svg'
import errorIcon from 'file!../assets/icons/16/icon-graph-16-error.svg'

class ActiveLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      opening: false
    }
  }

  render ({ to, className, children, active }, { opening }) {
    return (
      <NavLink activeClassName={styles['active'] } to={to} className={classNames(styles['coz-nav-link'], className)}>
        {children}
        {opening && <Spinner />}
      </NavLink>
    )
  }
}

const MenuItem = function ({ children, disabled }) {
  return <li class={styles['coz-nav-item']}>{
    children
  }</li>
}

const Navigation = ({ t, match, contracts }) => {
  return (
    <nav>
      <ul class={classNames(styles['coz-nav'])}>
        <MenuItem>
          <img src={filesIcon} /> <ActiveLink
            to='/contrats'
            active={match.path === 'contrats'}>
            Contrats
          </ActiveLink>
        </MenuItem>
        <MenuItem>
          <img src={errorIcon} /> <ActiveLink
            to='/sinistres'
            active={match.path === 'sinistres'}>
            Sinistres
          </ActiveLink>
        </MenuItem>
        <MenuItem>
          <img src={accountIcon} /> <ActiveLink
            to='/infos'
            active={match.path === 'infos'}>
            Infos personelles
          </ActiveLink>
        </MenuItem>
        <MenuItem>
          <img src={homeIcon} /> <ActiveLink
            to='/foyer'
            active={match.path === 'foyer'}>
            Foyer
          </ActiveLink>
        </MenuItem>
      </ul>
    </nav>
  )
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(translate()(Navigation))
)
