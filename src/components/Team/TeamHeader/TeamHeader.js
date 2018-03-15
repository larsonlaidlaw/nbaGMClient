import React from 'react'
import styles from './TeamHeader.css'
import TeamLogo from './TeamLogo/TeamLogo'

const teamHeader = (props) => {

  return(
    <div>
      <div className={styles.TeamHeader}>
        <div>
          <div className={styles.TeamName}>{props.team.team_name}</div>
          <div>Cap Room | -$36,000,000</div>
          <div>Over the Tax Line | $16,473,626</div>
        </div>
        <TeamLogo team={props.team}/>
      </div>
    </div>
  )
}

export default teamHeader
