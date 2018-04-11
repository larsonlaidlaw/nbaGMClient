import React from 'react'
import styles from './Team.css'

const Team = (props) => {
  const imagePath = require('../../../assets/images/teams/' + props.team.id + '.png')

  let clickFunction = props.initTradeTeamData

  if (props.tradeTeams.some(team => team.id === props.team.id)) {
    clickFunction = props.hideTeam
  }

  return (
    <div className={styles.Team} onClick={()=> clickFunction(props.team)}>
      <img src={imagePath} alt="teamlogo" />
    </div>
  )
}

export default Team
