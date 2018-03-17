import React from 'react'


import Aux from '../../../hoc/Aux'
import TargetAssets from './TargetAssets/TargetAssets'
import Players from './Players/Players'
import DraftPicks from './DraftPicks/DraftPicks'
import TradeExceptions from './TradeExceptions/TradeExceptions'

import styles from './TeamAssets.css'

const TeamAssets = (props) => {
  return (
    <Aux>
      <div className={styles.Heading}>Targets</div>
      <TargetAssets
        team={props.team}
      />
      <div className={styles.Heading}>Players</div>
      <Players
        team={props.team}
      />
      <div className={styles.Heading}>Future Picks</div>
      <DraftPicks
        team={props.team}
        draftpicks={props.team.draftpicks}/>
      <div className={styles.Heading}>Trade Exceptions</div>
      <TradeExceptions />
    </Aux>
  )
}



export default TeamAssets
