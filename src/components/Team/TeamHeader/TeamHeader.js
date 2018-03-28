import React from 'react'
import styles from './TeamHeader.css'
import TeamLogo from './TeamLogo/TeamLogo'
import * as helpers from '../../../helpers/helpers'

const teamHeader = (props) => {

   const calculateTeamSalary = (team) => {
     let activePlayersSalary = 0
     let deadSalary = 0
     let capHolds = 0
     let targetSalary = 0

     team.players.forEach( player => {
       if (player.contracts[0].active && !player.currentTarget) {
         activePlayersSalary += player.contracts[0].seasons[0].salary
       }
       if (!player.contracts[0].active && player.contracts[0].dead_seasons.length > 0) {
         deadSalary += player.contracts[0].dead_seasons[0].cap_hit
       }
       if (!player.contracts[0].active && player.contracts[0].dead_seasons.length < 1) {
         capHolds += player.contracts[0].cap_hold
       }
     })

      if (team.targetAssets) {
        team.targetAssets.forEach(target => {
          if (target.name) {
            targetSalary += target.contracts[0].seasons[0].salary
          }
        })

      }

     let totalTeamSalary = [activePlayersSalary, deadSalary, capHolds, targetSalary]
     return totalTeamSalary
   }

   const reducer = (array) => array.reduce((accumulator, current) => accumulator + current, 0)

   const displaySalaryCap = (totalTeamSalary, salaryCap) => {
     if (salaryCap > totalTeamSalary) {
       return <div>Cap Room | {helpers.formatMoney(salaryCap - totalTeamSalary)}</div>
     }

     if (totalTeamSalary > salaryCap) {
       return <div>Over the Cap | {helpers.formatMoney(totalTeamSalary - salaryCap)}</div>
     }
   }

   const displayLuxuryTax = (totalTeamSalary, luxuryTax) => {
     if (luxuryTax > totalTeamSalary) {
       return <div>Luxury Tax Room | {helpers.formatMoney(luxuryTax - totalTeamSalary)}</div>
     }

     if (totalTeamSalary > luxuryTax) {
       return <div>Over the Luxury Tax | {helpers.formatMoney(totalTeamSalary - luxuryTax)}</div>
     }
   }

  return(
    <div>
      <div className={styles.TeamHeader}>
        <div>
          <div className={styles.TeamName}>{props.team.team_name}</div>
          {displaySalaryCap(reducer(calculateTeamSalary(props.team)), props.seasonInfo.salaryCap)}
          {displayLuxuryTax(reducer(calculateTeamSalary(props.team)), props.seasonInfo.luxuryTax)}
          {/* <hr />
          <div>Active Salaries | {helpers.formatMoney(calculateTeamSalary(props.team)[0])}</div>
          <div>Dead Cap | {helpers.formatMoney(calculateTeamSalary(props.team)[1])}</div>
          <div>Cap Holds | {helpers.formatMoney(calculateTeamSalary(props.team)[2])}</div> */}
        </div>
        <TeamLogo team={props.team}/>
      </div>
    </div>
  )
}

export default teamHeader
