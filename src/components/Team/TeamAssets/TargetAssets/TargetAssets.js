import React from 'react'
import TargetPlayers from './TargetPlayers/TargetPlayers'
import TargetPicks from './TargetPicks/TargetPicks'
import TargetSummary from './TargetSummary/TargetSummary'

const targetAssets = (props) => {
  return (
    <div>
      <TargetPlayers {...props}/>
      <TargetPicks {...props}/>
      <TargetSummary team={props.team}/>
    </div>
  )
}


export default targetAssets
