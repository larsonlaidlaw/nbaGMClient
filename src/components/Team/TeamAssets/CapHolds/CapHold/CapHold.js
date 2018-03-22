import React from 'react'
import styles from './CapHold.css'

const capHold = (props) => (
  <div className={styles.CapHold}>
    <div>{props.player}</div>
    <div>{props.amount}</div>
  </div>
)

export default capHold
