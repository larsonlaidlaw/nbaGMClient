import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'
import SeasonInfo from '../SeasonInfo/SeasonInfo'

class Layout extends React.Component {
  render () {
    return (
      <div className={styles.Layout}>
        <SeasonInfo />
        <main >
          {this.props.children}
        </main>
        <div className={styles.footer}>
          Bluescreen Co 2018
        </div>
      </div>
    )
  }
}

export default Layout
