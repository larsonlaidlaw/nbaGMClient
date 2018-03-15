import React from 'react'
import styles from './DraftPickTeamLogo.css'

const draftPickTeamLogo = (props) =>  {

  const imagePath = require('../../../../../assets/images/teams/' + props.logo.toString() + '.png')

  return (
    <div className={styles.DraftPickTeamLogo}>
      <img src={imagePath} alt="player-name" />
    </div>
  )
}

export default draftPickTeamLogo
