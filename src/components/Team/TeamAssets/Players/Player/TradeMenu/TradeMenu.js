import React, { Fragment } from 'react'
import styles from './TradeMenu.css'
// import Aux from '../../../../../../hoc/Aux'
import Backdrop from '../../../../../UI/Backdrop/Backdrop'
// import Modal from '../../../../../UI/Modal/Modal'
import TradeMenuItem from './TradeMenuItem/TradeMenuItem'
import * as menuHelpers from '../../../../../../helpers/menuHelpers'

const tradeMenu = (props) => {

  let menuContent

  if (props.menuType === "playerMenu") {
    let tradeMessage = props.tradeTeams.length > 1 ? <span>Trade {props.player.name} to: </span> : <span>Add another team to trade.</span>

    const tradeTeams = props.tradeTeams.map(team => {
      return team.id !== props.player.team_id ? <TradeMenuItem
        key={team.id}
        click={props.addAssetToTrade}
        arg1={props.player}
        arg2={props.player.team_id}
        arg3={team}
        >{team.team_name}</TradeMenuItem> : null
    })

    const waivePlayerMenu = <Fragment>
      <hr />
      <TradeMenuItem click={props.waivePlayer} arg1={props.player}>Waive {props.player.name}</TradeMenuItem>
      <TradeMenuItem click={props.waivePlayer} arg1={props.player} arg2={true}>Waive and stretch {props.player.name}</TradeMenuItem>
   </Fragment>

   const playerOptionMenu = <Fragment>
     <hr />
     <TradeMenuItem click={()=> props.optInPlayerContract(props.player)}>Opt in to last year of contract.</TradeMenuItem>
     <TradeMenuItem click={()=> props.optOutPlayerContract(props.player)}>Opt out of last year of contract.</TradeMenuItem>
   </Fragment>

   const teamOptionMenu = <Fragment>
     <hr />
     <TradeMenuItem click={()=> props.pickUpTeamOption(props.player)}>Pick up team option.</TradeMenuItem>
     <TradeMenuItem click={()=> props.declineTeamOption(props.player)}>Decline team option.</TradeMenuItem>
   </Fragment>

   const extensionMessage = <Fragment>
     <hr />
     <TradeMenuItem click={()=> (props.selectModalTarget(props.player), props.modalToggler(props.player))}>Sign {props.player.name} to contract extension.</TradeMenuItem>
   </Fragment>

   menuContent = <Fragment>
     {menuHelpers.playerUnderContract(props.player) && menuHelpers.tradeEligible(props.player) && tradeMessage }
     {tradeTeams}
     {menuHelpers.eligibleForExtension(props.player) && extensionMessage}
     {!menuHelpers.hasTeamOption(props.player) && waivePlayerMenu}
     {menuHelpers.hasPlayerOption(props.player) && playerOptionMenu}
     {menuHelpers.hasTeamOption(props.player) && teamOptionMenu}
   </Fragment>
 }

 if (props.menuType === "targetPlayer" || props.player.currentTarget) {
   menuContent = (
     <TradeMenuItem
       className={styles.TradeMenuItem}
       click={props.removeTradeAsset} arg1={props.player}>Remove {props.player.name} From Trade</TradeMenuItem>
   )
 }

 if (props.menuType === "capHoldMenu") {
   menuContent = (
     <Fragment>
       <TradeMenuItem click={()=> (props.selectModalTarget(props.player), props.modalToggler(props.player, props.team))}>Resign {props.player.name}.</TradeMenuItem>

       <hr />
       <TradeMenuItem click={props.renounceCapHold} arg1={props.player}>Renounce {props.player.name}</TradeMenuItem>
     </Fragment>
   )
 }

 if (props.menuType === "teamMenu") {
   menuContent = (
     <Fragment>
       <TradeMenuItem>Sign a Free Agent</TradeMenuItem>
     </Fragment>
   )
 }

    return (
      <Fragment>
        <Backdrop close={props.menuToggler}/>
        <div className={styles.TradeMenu}>
          {menuContent}
        </div>
      </Fragment>
    )
}

export default tradeMenu
