import React from 'react'
import CircleImage from './CircleImage/CircleImage'

import styles from './Player.css'

const player = (props) => (
  <div className={styles.Player}>
    <CircleImage fileName={props.fileName} />
    <div className={styles.PlayerInfo}>
      <div><span>{props.name}</span></div>
      <div><span>{`${props.age} years old`}</span></div>
    </div>
    <div className={styles.SalaryInfo}>
      <div><span>{props.salary}</span></div>
      <div><span>{props.years_left}</span></div>
      <div><span>{props.option}</span></div>
    </div>
  </div>
)

export default player
