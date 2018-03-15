import React from 'react'
import styles from './TradeException.css'

const tradeException = (props) => (
  <div className={styles.TradeException}>
    <div>{props.player}</div>
    <div>{props.amount}</div>
  </div>
)

export default tradeException
