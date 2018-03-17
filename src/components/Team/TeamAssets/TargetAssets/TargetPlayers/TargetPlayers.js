import React from 'react'
import Player from '../../Players/Player/Player'

const targetPlayers = (props) => {

  const calculateAge = (dateString) => {
    var birthDate = new Date(dateString);
    var ageDifMs = Date.now() - birthDate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const formatSalary = (player) => {
    let salary = "$X,XXX,XXX"
    const season = player.contracts[0].seasons[0]
    if (season) {
        salary = player.contracts[0].seasons[0].salary
        salary = salary.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
        salary = '$' + salary
    }
    return salary
  }

  const calcYearsRemaining = (player) => {
    const contract = player.contracts[0]
    const remainingYears = contract.seasons.length - 1

    let x
    if (remainingYears > 1) {
      x = `${remainingYears} years left`
    }

    if (remainingYears === 1) {
      x = 'Expiring Contract'
    }

    if (remainingYears < 1) {
      x = 'Free Agent'
    }
    return x
  }

  const findOption = (player) => {
    let optionType = "No Options"
    const season = player.contracts[0].seasons[0]

    if (season) {
      if (season.player_option) {
        optionType = "Player Option"
      }

      if (season.team_option) {
        optionType = "Team Option"
      }
    }
    return optionType
  }
  let targets = null
  if (props.team.targetAssets) {
    targets = props.team.targetAssets.map(target => {
      if (target.name) {
        return <Player
          key={target.id}
          name={target.name}
          age={calculateAge(target.birth_date)}
          salary={formatSalary(target)}
          years_left={calcYearsRemaining(target)}
          option={findOption(target)}
          fileName='lebron_james'
          player={target}
          team={props.team}
        />
      }
      return
    })
  }

  return(
    <div>
      {targets}
    </div>
  )
}

export default targetPlayers
