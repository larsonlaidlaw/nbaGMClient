import React from 'react'
import TargetPlayers from './TargetPlayers/TargetPlayers'
import TargetPicks from './TargetPicks/TargetPicks'

const targetAssets = (props) => {
  return (
    <div>
      <TargetPlayers team={props.team}/>
      <TargetPicks team={props.team}/>
    </div>
  )
}


export default targetAssets
