import React, { Fragment } from 'react'
import Aux from '../../../hoc/Aux'
import TargetAssets from './TargetAssets/TargetAssets'
import Players from './Players/Players'
import DraftPicks from './DraftPicks/DraftPicks'
import TradeExceptions from './TradeExceptions/TradeExceptions'
import DeadCap from './DeadCap/DeadCap'
import CapHolds from './CapHolds/CapHolds'

import styles from './TeamAssets.css'

const TeamAssets = (props) => {

  let renderTargets = null
  let renderDeadSalary = null
  let renderCapHolds = null

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

  props.team.players.forEach(player => {
    if (player.contracts[0].active === false) {
      renderCapHolds = (
        <Fragment>
          <div className={styles.Heading}>Cap Holds</div>
          <CapHolds {...props} />
        </Fragment>
      )
    }
  })

  props.team.players.forEach(player => {
    if (player.contracts[0].dead_seasons.length > 0) {
      renderDeadSalary = (
        <Fragment>
          <div className={styles.Heading}>Dead Salary Cap</div>
          <DeadCap {...props}/>
        </Fragment>
      )
    }
  })

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
      {/* <div className={styles.Heading}>Trade Exceptions</div> */}
      {/* <TradeExceptions /> */}

      {renderCapHolds}
      {renderDeadSalary}

    </Aux>
  )
}

export default TeamAssets
