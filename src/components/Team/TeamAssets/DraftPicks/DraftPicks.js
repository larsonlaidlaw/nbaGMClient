import React from 'react'
import DraftPick from './DraftPick/DraftPick'
import DraftPickTeamLogo from './DraftPickTeamLogo/DraftPickTeamLogo'
import styles from './DraftPicks.css'


const draftPicks = (props) => {

  const picks = props.team.draftpicks.map( pick => {
    if (pick.team_id === pick.original_team) {
      return <DraftPick
        key={pick.id}
        pick={pick}
        whichMenu="draftpick"
        {...props}
      />
    }
    return null
  })

  const otherTeamspicks = props.team.draftpicks.map( pick => {
    if (pick.team_id !== pick.original_team) {
      return <DraftPickTeamLogo
        key={pick.id}
        pick={pick}
        whichMenu="draftpick"
        {...props}
      />
    }
    return null
  })

  return (
    <div className={styles.DraftPicks}>
      <div className={styles.TeamPicks}>{picks}</div>
      <div className={styles.OtherTeamsPicks}>{otherTeamspicks}</div>
    </div>
  )
}

export default draftPicks
