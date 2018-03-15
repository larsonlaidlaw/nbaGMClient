import React from 'react'
import DraftPick from './DraftPick/DraftPick'
import DraftPickTeamLogo from './DraftPickTeamLogo/DraftPickTeamLogo'
import styles from './DraftPicks.css'


const draftPicks = (props) => {

  console.log(props);

  const picks = props.draftpicks.map( pick => {
    if (pick.team_id === pick.original_team) {
      return <DraftPick team={props.team} round={pick.round} year={pick.year} />
    }
  })

  const otherTeamspicks = props.draftpicks.map( pick => {
    if (pick.team_id !== pick.original_team) {
      // console.log(props.draftpicks.original_team);
      return <DraftPickTeamLogo logo={pick.original_team}/>
    }
  })

  return (
    <div className={styles.DraftPicks}>
      <div className={styles.TeamPicks}>{picks}</div>
      <div>{otherTeamspicks}</div>
    </div>
  )
}

export default draftPicks
