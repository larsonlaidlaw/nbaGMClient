import React from 'react'
import Aux from '../../../../../../hoc/Aux'
import Backdrop from '../../../../../UI/Backdrop/Backdrop'
import styles from './DraftPickMenu.css'



const draftPickMenu = (props) => {
  let tradeTeams = 'Add another team to trade.'

  if (props.tradeTeams.length > 1) {
    tradeTeams = props.tradeTeams.map( team => {
      console.log(team, props);
      if (team.id !== props.pick.team_id) {
        return (
          <div
            key={team.id}
            className={styles.MenuItem}
            onMouseDown={(event)=> props.addDraftPickToTrade(props.pick, team, props.pick.original_team)}
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
      <div className={styles.DraftPickMenu} >
        <div>Trade {props.year} {props.round === 1 ? "1st" : "2nd"} pick round pick to:</div>
        <hr />
        {tradeTeams}
      </div>
    </Aux>


  )
}


export default draftPickMenu
