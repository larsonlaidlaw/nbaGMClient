import React from 'react'
import styles from './WaivedPlayer.css'

const waivedPlayer = (props) => (
  <div className={styles.WaivedPlayer}>
    <div>{props.player}</div>
    <div>{props.amount}</div>
  </div>
)

export default waivedPlayer
