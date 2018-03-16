import React from 'react'
import Player from './Player/Player'

const players = (props) => {

  let players = "loading"

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



  if (props.players){

    players = props.players.map((player)=>{
      return(
        <Player
          key={player.id}
          name={player.name}
          age={calculateAge(player.birth_date)}
          salary={formatSalary(player)}
          years_left={calcYearsRemaining(player)}
          option={findOption(player)}
          fileName='lebron_james'
        />
      )
    })
  }

  return (
    <div>
      {players}
    </div>
  )
}

export default players
