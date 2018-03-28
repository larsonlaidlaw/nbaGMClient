import React from 'react'
import Player from '../../Players/Player/Player'

const targetPlayers = (props) => {

  let targets = null
  if (props.team.targetAssets) {
    targets = props.team.targetAssets.map(target => {
      if (target.name) {
        return <Player
          key={target.id}
          player={target}
          menuType="targetPlayer"
          {...props}
        />
      }
      return null
    })
  }

  return(
    <div>
      {targets}
    </div>
  )
}

export default targetPlayers
