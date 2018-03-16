import React from 'react'
import DraftPickTeamLogo from '../../DraftPicks/DraftPickTeamLogo/DraftPickTeamLogo'
import styles from './TargetPicks.css'

const targetPicks = () => (
  <div>
    <div className={styles.TargetPicks}>

      <DraftPickTeamLogo logo="1"/>
      <DraftPickTeamLogo logo="14" />
    </div>
    <div className={styles.Summary}>
      <div>2 Players | 4 Picks</div>
      <div>$58,000,000</div>
    </div>
  </div>
)

export default targetPicks
