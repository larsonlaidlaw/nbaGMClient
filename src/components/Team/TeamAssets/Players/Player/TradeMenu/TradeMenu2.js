import React from 'react'
import styles from './TradeMenu.css'
import Aux from '../../../../../../hoc/Aux'
import Backdrop from '../../../../../UI/Backdrop/Backdrop'


const tradeMenu = (props) => {

  let playerOption = null

  if (props.player.contracts[0].seasons[0].player_option) {
    playerOption = <Aux>
      <hr />
      <div className={styles.TradeMenuItem}>Opt out of contract.</div>
      <hr />
      <div className={styles.TradeMenuItem}>Opt into contract.</div>
    </Aux>
  }

  if (props.whichMenu === "target") {
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
              onMouseDown={(event)=> props.addAssetToTrade(props.player, props.player.team_id, team)}
              >{team.team_name}
            </div>
          )
        }
        return null
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
            {playerOption}
        </div>
      </Aux>
    )
  }
}

export default tradeMenu
