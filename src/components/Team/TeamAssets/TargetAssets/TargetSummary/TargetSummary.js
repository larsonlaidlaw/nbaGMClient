import React from 'react'
import styles from './TargetSummary.css'

const targetSummary = (props) => {

  const classes = [styles.TargetSummary]

  let numOfPlayers = 0
  let numOfPicks = 0
  let totalSalary = 0

  console.log(props.team.targetAssets.length);

  props.team.targetAssets.forEach(asset =>{
    if (asset.name) {
      numOfPlayers += 1
      if (asset.contracts[0].seasons && asset.contracts[0].seasons[0]) {
        totalSalary += asset.contracts[0].seasons[0].salary
      } else {
        totalSalary += 0
      }
    }
    if (asset.round) {
      numOfPicks += 1
    }
  })

  const formatSalary = (salary) => {
    salary = salary.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
    salary = '$' + salary
    return salary
  }

  return (
    <div>
      <div className={styles.Summary}>
        <div>{numOfPlayers} Players | {numOfPicks} Picks</div>
        {/* <div>$58,000,000</div> */}
        <div>{formatSalary(totalSalary)}</div>
      </div>
    </div>
  )
}


export default targetSummary
