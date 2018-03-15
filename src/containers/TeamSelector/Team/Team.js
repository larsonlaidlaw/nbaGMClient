import React from 'react'
import styles from './Team.css'

const Team = (props) => {
  const imagePath = require('../../../assets/images/teams/' + props.team.nickname + '.png')

  return (
    <div className={styles.Team} onClick={()=> props.initTradeTeamData(props.team)}>
      <img src={imagePath} alt="teamlogo" />
    </div>
  )
}

export default Team
