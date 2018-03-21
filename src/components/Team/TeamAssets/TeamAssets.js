import React from 'react'


import Aux from '../../../hoc/Aux'
import TargetAssets from './TargetAssets/TargetAssets'
import Players from './Players/Players'
import DraftPicks from './DraftPicks/DraftPicks'
import TradeExceptions from './TradeExceptions/TradeExceptions'

import styles from './TeamAssets.css'

const TeamAssets = (props) => {

  let renderTargets = null

  if (props.team.targetAssets && props.team.targetAssets.length >= 1) {
    renderTargets = (
      <Aux>
        <div className={styles.Heading}>Targets</div>
        <TargetAssets
          {...props}
        />
      </Aux>
    )
  }

  return (
    <Aux>
      {renderTargets}
      <div className={styles.Heading}>Players</div>
      <Players
        {...props}
      />
      <div className={styles.Heading}>Future Picks</div>
      <DraftPicks
        {...props}
        />
      <div className={styles.Heading}>Trade Exceptions</div>
      <TradeExceptions />
    </Aux>
  )
}

export default TeamAssets
