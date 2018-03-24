import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'
import { connect } from 'react-redux'
import DateSelect from '../DateSelect/DateSelect'
import SeasonInfo from '../SeasonInfo/SeasonInfo'
import * as actions from '../../store/actions/actions'

class Layout extends React.Component {
  render () {
    return (
      <Aux>
        <SeasonInfo />
        <main className={styles.Layout}>
          {this.props.children}
        </main>
        <div className={styles.footer}>
          Bluescreen Co 2018
        </div>
      </Aux>
    )
  }
}

export default Layout
