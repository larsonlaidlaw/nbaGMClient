import React from 'react'
import DraftPick from './DraftPick/DraftPick'
import DraftPickTeamLogo from './DraftPickTeamLogo/DraftPickTeamLogo'
import styles from './DraftPicks.css'


const draftPicks = (props) => {

  const picks = props.draftpicks.map( pick => {
    if (pick.team_id === pick.original_team) {
      return <DraftPick key={pick.id} team={props.team} round={pick.round} year={pick.year} />
    }
    return null
  })

  const otherTeamspicks = props.draftpicks.map( pick => {
    if (pick.team_id !== pick.original_team) {
      return <DraftPickTeamLogo key={pick.id} logo={pick.original_team}/>
    }
    return null
  })

  return (
    <div className={styles.DraftPicks}>
      <div className={styles.TeamPicks}>{picks}</div>
      <div>{otherTeamspicks}</div>
    </div>
  )
}

export default draftPicks
