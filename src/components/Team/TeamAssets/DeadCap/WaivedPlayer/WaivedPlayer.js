import React from 'react'
import styles from './WaivedPlayer.css'

const waivedPlayer = (props) => {

  const formatCapHit = (player) => {

    let capHit = player.contracts[0].dead_seasons[0].cap_hit
    capHit = capHit.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
    capHit = '$' + capHit

    return capHit
  }


  return (
    <div className={styles.WaivedPlayer}>
      <div>{props.player.name}</div>
      <div>{formatCapHit(props.player)}</div>
    </div>
  )
}

export default waivedPlayer
