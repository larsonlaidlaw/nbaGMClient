import React from 'react'
import Aux from '../../../../../../hoc/Aux'
import Backdrop from '../../../../../UI/Backdrop/Backdrop'
import styles from './DraftPickMenu.css'

const draftPickMenu = (props) => {

  console.log(props);

  if (props.pick.currentTarget || props.whichMenu === "target") {
    return (
      <Aux>
        <Backdrop menuClose={props.menuClose}/>
          <div className={styles.DraftPickMenu}>
            <div
              className={styles.MenuItem}
              onMouseDown={()=> props.removeTradeAsset(props.pick)}
              >Remove {props.year} draftpick from trade.</div>
          </div>
      </Aux>
    )
  }

  if (props.whichMenu === "draftpick") {
    let tradeTeams = 'Add another team to trade.'

    if (props.tradeTeams.length > 1) {
      tradeTeams = props.tradeTeams.map( team => {
        if (team.id !== props.pick.team_id) {
          return (
            <div
              key={team.id}
              className={styles.MenuItem}
              onMouseDown={(event)=> props.addAssetToTrade(props.pick, props.pick.team_id, team)}
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
        <div className={styles.DraftPickMenu} >
          <div>Trade {props.year} {props.round === 1 ? "1st" : "2nd"} pick round pick to:</div>
          <hr />
          {tradeTeams}
        </div>
      </Aux>
    )
  }
}

export default draftPickMenu
