import React from 'react'
import WaivedPlayer from './WaivedPlayer/WaivedPlayer'

const deadCap = (props) => {
  const waivedPlayers = props.team.players.map(player=> {
    if (player.contracts[0].active === false && player.contracts[0].dead_seasons.length > 0) {
      return <WaivedPlayer key={player.id} player={player} cap_hit={player.contracts[0].dead_seasons[0].cap_hit} />
    }
  })
  return (
    <div>{waivedPlayers}</div>
  )
}
export default deadCap
