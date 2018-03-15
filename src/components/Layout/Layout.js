import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'

const layout = (props) => (
  <Aux>
    <div>
      <p>Header</p>
    </div>
    <main className={styles.Layout}>
      {props.children}
    </main>
    <div className={styles.footer}>
      Bluescreen Co 2018
    </div>
  </Aux>

)

export default layout
