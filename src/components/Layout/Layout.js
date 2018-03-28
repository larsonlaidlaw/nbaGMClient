import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'
import SeasonInfo from '../SeasonInfo/SeasonInfo'

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
