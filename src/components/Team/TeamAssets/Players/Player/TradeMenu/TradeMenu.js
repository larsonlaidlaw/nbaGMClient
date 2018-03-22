import React from 'react'
import styles from './TradeMenu.css'
import Aux from '../../../../../../hoc/Aux'
import Backdrop from '../../../../../UI/Backdrop/Backdrop'

const tradeMenu = (props) => {

  var menuContent = <div>{props.player.name} can't be traded.</div>
  var tradeTarget = false

  if (props.whichMenu === "target" || props.player.currentTarget) {
    tradeTarget = true
    menuContent = (
      <div
        className={styles.TradeMenuItem}
        onMouseDown={()=> props.removeTradeAsset(props.player)}>Remove {props.player.name} From Trade</div>
    )
  }

  const playerUnderContract = (player) => {
    if (player.contracts[0].seasons.length >= 1) {
      const last_season_index = player.contracts[0].seasons.length - 1
      if (player.contracts[0].seasons[last_season_index].player_option) {
        return false
      }
      return true
    }
    return false
  }

  if (!tradeTarget && props.whichMenu === "player" && playerUnderContract(props.player)) {
    let tradeMessage = "Add another team to trade"
      if (props.tradeTeams.length > 1) {
        tradeMessage = `Trade ${props.player.name} to:`
      }
      const tradeTeams = props.tradeTeams.map( team => {
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

    menuContent = (
      <Aux>
        {tradeMessage}
        {tradeTeams}
      </Aux>
    )
  }

  return (
    <Aux>
      <Backdrop menuClose={props.menuClose}/>
        <div className={styles.TradeMenu} >
          {menuContent}
        </div>
    </Aux>
  )
}

export default tradeMenu


//
//
//   const teamOptions = () => {
//     return (
//       <Aux>
//         <hr />
//         <div className={styles.TradeMenuItem}>Sign {props.player.name} to contract extension</div>
//         <hr />
//         <div className={styles.TradeMenuItem}>Release {props.player.name}</div>
//       </Aux>
//     )
//   }
//
//   return (
//     <Aux>
//       <div>{tradeMessage}</div>
//       {tradeTeams.length > 1 ? <hr /> : null}
//       {tradeTeams}
//       {teamOptions()}
//     </Aux>
//   )
// }
//
//
// // const playerUnderContractWithOption
// // const freeAgent
//
// return (
//   <Aux>
//     <Backdrop menuClose={props.menuClose}/>
//     <div className={styles.TradeMenu}>
//       {playerUnderContract()}
//     </div>
//   </Aux>
// )
// }
//
//
// {/* <hr />
// <div className={styles.TradeMenuItem}>Sign {props.player.name}</div>
// <hr />
//
// <hr />
// <div className={styles.TradeMenuItem}>Pick up team option for {props.player.contracts[0].seasons[0].salary}</div>
// <hr />
// <div className={styles.TradeMenuItem}>Decline Team Option</div>
// <hr />
// <div className={styles.TradeMenuItem}>Opt into final year of contract</div>
// <hr />
// <div className={styles.TradeMenuItem}>Opt out of final year of contract</div> */}
