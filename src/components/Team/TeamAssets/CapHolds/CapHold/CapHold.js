import React from 'react'
import styles from './CapHold.css'

const capHold = (props) => {

  const formatCapHold = (player) => {

    let cap_hold = player.contracts[0].cap_hold
    cap_hold = cap_hold.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
    cap_hold = '$' + cap_hold

    return cap_hold
  }

  return (
    <div className={styles.CapHold}>
      <div>{props.player.name}</div>
      <div>{formatCapHold(props.player)}</div>
    </div>
  )
}

export default capHold
