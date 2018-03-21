import React from 'react'
import Player from './Player/Player'

const players = (props) => {

  let players = "loading"

  if (props.team.players){

    players = props.team.players.map((player)=>{
      return(
        <Player
          key={player.id}
          player={player}
          whichMenu="player"
          {...props}
        />
      )
    })
  }

  return (
    <div>
      {players}
    </div>
  )
}

export default players
