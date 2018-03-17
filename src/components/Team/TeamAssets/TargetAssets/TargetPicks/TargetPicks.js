import React from 'react'
import DraftPickTeamLogo from '../../DraftPicks/DraftPickTeamLogo/DraftPickTeamLogo'
import styles from './TargetPicks.css'

const targetPicks = (props) => {

  let targets = null
  if (props.team.targetAssets) {
    targets = props.team.targetAssets.map(target => {
      if (target.round) {
        return <DraftPickTeamLogo
          key={target.id}
          logo={target.original_team}
        />
      }
      return
    })
  }

  return (
    <div>
      <div className={styles.TargetPicks}>
        {targets}

        {/* <DraftPickTeamLogo logo="1"/>
        <DraftPickTeamLogo logo="14" /> */}
      </div>
      <div className={styles.Summary}>
        <div>2 Players | 4 Picks</div>
        <div>$58,000,000</div>
      </div>
    </div>
  )
}


export default targetPicks
