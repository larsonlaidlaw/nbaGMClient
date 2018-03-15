import React from 'react'
import DraftPick from '../../DraftPicks/DraftPick/DraftPick'
import DraftPickTeamLogo from '../../DraftPicks/DraftPickTeamLogo/DraftPickTeamLogo'
import styles from './TargetPicks.css'

const targetPicks = () => (
  <div>
    <div className={styles.TargetPicks}>
      <DraftPick />
      <DraftPick />
      <DraftPick />
      <DraftPickTeamLogo team='nets' />
      <DraftPickTeamLogo team='celtics' />
    </div>
    <div className={styles.Summary}>
      <div>2 Players | 4 Picks</div>
      <div>$58,000,000</div>
    </div>
  </div>
)

export default targetPicks
