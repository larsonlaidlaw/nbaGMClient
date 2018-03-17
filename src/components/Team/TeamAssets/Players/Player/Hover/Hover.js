import React from 'react'
import styles from './Hover.css'
import Aux from '../../../../../../hoc/Aux'
import Backdrop from '../../../../../UI/Backdrop/Backdrop'


const hover = (props) => {
  let tradeTeams = 'Add another team to trade.'

  if (props.tradeTeams.length > 1) {
    tradeTeams = props.tradeTeams.map( team => {
      if (team.id !== props.player.team_id) {
        return (
          <div
            key={team.id}
            className={styles.HoverItem}
            onMouseDown={(event)=> props.addPlayerToTrade(props.player, team)}
            >{team.team_name}
          </div>
        )
      }
      return
    })
  }

  return (
    <Aux>
      <Backdrop menuClose={props.menuClose}/>
      <div className={styles.Hover} >
          <div>Trade {props.player.name} to:</div>
          <hr />
          {tradeTeams}
          <hr />
          <div className={styles.HoverItem}>Release {props.player.name}</div>
      </div>
    </Aux>

  )
}


export default hover
