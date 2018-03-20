import React from 'react'
import TargetPlayers from './TargetPlayers/TargetPlayers'
import TargetPicks from './TargetPicks/TargetPicks'
import TargetSummary from './TargetSummary/TargetSummary'

const targetAssets = (props) => {
  return (
    <div>
      <TargetPlayers team={props.team}/>
      <TargetPicks team={props.team}/>
      <TargetSummary team={props.team}/>
    </div>
  )
}


export default targetAssets
