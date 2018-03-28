import React from 'react'
import CapHold from './CapHold/CapHold'

const capHolds = (props) => {
  const playersWithCapHolds = props.team.players.map(player => {
    if (player.contracts[0].active === false && player.contracts[0].dead_seasons.length < 1) {
      return <CapHold
        key={player.id}
        player={player}
        cap_hold={player.contracts[0].cap_hold} 
        menuType="capHoldMenu"
        {...props}
      />
    }
    return null
  })
  return (
    <div>
      {playersWithCapHolds}
    </div>

  )
}

export default capHolds
