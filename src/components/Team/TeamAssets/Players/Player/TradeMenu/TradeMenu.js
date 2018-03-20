import React from 'react'
import styles from './TradeMenu.css'
import Aux from '../../../../../../hoc/Aux'
import Backdrop from '../../../../../UI/Backdrop/Backdrop'


const tradeMenu = (props) => {

  if ( props.player.currentTarget || props.whichMenu === "target") {
    {console.log(props.player)}
    return (
      <Aux>
        <Backdrop menuClose={props.menuClose}/>
          <div className={styles.TradeMenu} >
            <div
              className={styles.TradeMenuItem}
              onMouseDown={()=> props.removeTradeAsset(props.player)}>Remove {props.player.name} From Trade</div>
          </div>
      </Aux>
    )
  }

  if (props.whichMenu === "player") {
    let tradeTeams = 'Add another team to trade.'
    if (props.tradeTeams.length > 1) {
      tradeTeams = props.tradeTeams.map( team => {
        if (team.id !== props.player.team_id) {
          return (
            <div
              key={team.id}
              className={styles.TradeMenuItem}
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
        <div className={styles.TradeMenu} >
            <div>Trade {props.player.name} to:</div>
            <hr />
            {tradeTeams}
            <hr />
            <div className={styles.TradeMenuItem}>Release {props.player.name}</div>
        </div>
      </Aux>
    )
  }
}


export default tradeMenu
