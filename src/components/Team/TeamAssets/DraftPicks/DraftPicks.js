import React from 'react'
import DraftPick from './DraftPick/DraftPick'
import DraftPickTeamLogo from './DraftPickTeamLogo/DraftPickTeamLogo'
import styles from './DraftPicks.css'


const draftPicks = (props) => {

  return (
    <div className={styles.DraftPicks}>
      <DraftPick team={props.team} ineligible={true} round='1'/>
      <DraftPick team={props.team} round='1'/>
      <DraftPick team={props.team} round='1'/>
      <DraftPick team={props.team} round='1'/>
      <DraftPick team={props.team} round='1'/>
      <DraftPick team={props.team} round='1'/>
      <DraftPick team={props.team} round='1'/>
      <DraftPick team={props.team} />
      <DraftPick team={props.team} />
      <DraftPick team={props.team} />
      <DraftPick team={props.team} />
      <DraftPick team={props.team} />
      <DraftPick team={props.team} />
      <DraftPick team={props.team} />
      <DraftPickTeamLogo team='nets' />
      <DraftPickTeamLogo team='celtics' />
      <DraftPickTeamLogo team='nets' />
      <DraftPickTeamLogo team='celtics' />
    </div>
  )
}

export default draftPicks
