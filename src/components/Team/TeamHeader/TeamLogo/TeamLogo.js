import React from 'react'
import styles from './TeamLogo.css'

const teamLogo = (props) => {
  const imageURL = require('../../../../assets/images/teams/' + props.team.id + '.png')

  return (
    <div className={styles.TeamLogo}>
      <img src={imageURL} alt="team-name" />
    </div>
  )
}

export default teamLogo
