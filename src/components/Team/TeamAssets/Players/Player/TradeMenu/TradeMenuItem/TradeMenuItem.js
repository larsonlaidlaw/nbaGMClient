import React from 'react'
import styles from './TradeMenuItem.css'

const tradeMenuItem = (props) => {
  return(
    <div
      className={styles.TradeMenuItem}
      onClick={(event)=> props.click(props.arg1, props.arg2, props.arg3)}>
      {props.children}
    </div>
  )
}

export default tradeMenuItem
