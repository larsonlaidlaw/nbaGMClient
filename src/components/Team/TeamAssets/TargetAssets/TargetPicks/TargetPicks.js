import React from 'react'
import DraftPickTeamLogo from '../../DraftPicks/DraftPickTeamLogo/DraftPickTeamLogo'
import styles from './TargetPicks.css'

const targetPicks = (props) => {

  const classes = [styles.TargetPicks]

  let targets = null
  if (props.team.targetAssets) {
    targets = props.team.targetAssets.map(target => {
      if (target.round) {
        if (classes.length <= 1) {
          classes.push(styles.Padding)
        }
        return <DraftPickTeamLogo
          key={target.id}
          logo={target.original_team}
          round={target.round}
          pick={target}
          whichMenu="target"
        />
      }
      return null
    })
  }

  return (
    <div>
      <div className={classes.join(' ')}>
        {targets}
      </div>
    </div>
  )
}


export default targetPicks
