import React from 'react'
import Player from './Player/Player'

const players = (props) => {

  let players = "loading"

  if (props.team.players){

    players = props.team.players.map((player)=>{
      if (player.contracts[0].active) {
        return(
          <Player
            key={player.id}
            player={player}
            menuType="playerMenu"
            {...props}
          />
        )
      }
      return null
    })
  }

  return (
    <div>
      {players}
    </div>
  )
}

export default players
