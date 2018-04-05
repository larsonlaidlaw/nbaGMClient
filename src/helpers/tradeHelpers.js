import * as seasonInfo from './seasonInfo'
import * as helpers from './helpers'

export const isTradeValid = (team, seasonInfo) => {
  if (isUnderSalaryCap(team, seasonInfo)) {
    return true
  }

  if (isUnderLuxuryTax(team, seasonInfo)) {
    return nonTaxPaying(team)
  }

  if (!isUnderLuxuryTax(team, seasonInfo)) {
    return taxPaying(team)
  }
}

export const isUnderSalaryCap = (team, seasonInfo) => {
  return seasonInfo.salaryCap + 100000 > calculateTeamTotalSalary(team) ? true : false
}

export const isUnderLuxuryTax = (team, seasonInfo) => {
  return seasonInfo.luxuryTax > calculateTeamTotalSalary(team) ? true : false
}

export const transactionFeedback = (team, seasonInfo) => {
  let message = ''

  if (isUnderSalaryCap(team, seasonInfo)) {
    message = `the ${team.team_name} are under the Salary Cap`
  }

  if (isUnderLuxuryTax(team, seasonInfo)) {
    message = `the ${team.team_name} over the Salary Cap but not yet into the Luxury Tax`
  }

  if (!isUnderLuxuryTax(team, seasonInfo)) {
    message = `the ${team.team_name} into the Luxury Tax`
  }

  let feedback = {
    message: message,
    outgoing: calculateOutgoingSalary(team),
    incoming: calculateIncomingSalary(team),
    maxIncoming: maxIncoming(team),
    requiredOutgoing: requiredOutgoing(team, seasonInfo)
  }
  return {
    isValid: isTradeValid(team, seasonInfo),
    feedback: feedback
  }
}

export const maxIncoming = (team) => {
  if (calculateOutgoingSalary(team) < 6533333) {
    return  calculateOutgoingSalary(team) * 1.75 + 100000
  }

  if (calculateOutgoingSalary(team) > 6533333 && calculateOutgoingSalary(team) < 19600000 ) {
    return  calculateOutgoingSalary(team) + 5000000
  }

  if (calculateOutgoingSalary(team) > 19600000 ) {
    return calculateOutgoingSalary(team) * 1.25 + 100000
  }
}

export const requiredOutgoing = (team, seasonInfo) => {
  if (isUnderLuxuryTax(team, seasonInfo)) {
    // console.log(`${team.team_name} under the tax`)
    if ((calculateIncomingSalary(team) - 100000) / 1.75 < 6533333 ) {
      // console.log(`${team.team_name} a`)
      return (calculateIncomingSalary(team) - 100000) / 1.75
    }

    if ((calculateIncomingSalary(team) - 5000000) > 6533333 && (calculateIncomingSalary(team) - 5000000) < 19600000 ) {
      // console.log(`${team.team_name} b`)
      return  calculateIncomingSalary(team) - 5000000
    }

    if ((calculateIncomingSalary(team) - 100000) / 1.25 > 19600000) {
      // console.log(`${team.team_name} c`)
      return (calculateIncomingSalary(team) - 100000) / 1.25
    }
  } else {
    // console.log(`${team.team_name} over the tax, d`)
    return (calculateIncomingSalary(team) - 100000) / 1.25
  }
}

export const nonTaxPaying = (team) => {
  console.trace()
  console.log(team.team_name, 'nonTaxPaying');
  if (calculateOutgoingSalary(team) < 6533333) {
    return calculateOutgoingSalary(team) * 1.75 + 100000 >= calculateIncomingSalary(team) ? true : false
  }

  if (calculateOutgoingSalary(team) > 6533333 && calculateOutgoingSalary(team) < 19600000 ) {
    return calculateOutgoingSalary(team) + 5000000 >= calculateIncomingSalary(team) ? true : false
  }

  if (calculateOutgoingSalary(team) > 19600000 ) {
    return calculateOutgoingSalary(team) * 1.25 + 100000 >= calculateIncomingSalary(team) ? true : false
  }
}

export const taxPaying = (team) => {
  console.log(team.team_name, 'taxpaying');
  return calculateOutgoingSalary(team) * 1.25 + 100000 >= calculateIncomingSalary(team) ? true : false
}

export const calculateTeamTotalSalary = (team) => {
  let totalTeamSalary = 0

  totalTeamSalary += calculateActivePlayerSalary(team)
  totalTeamSalary+= calculateCapHolds(team)
  totalTeamSalary += calculateDeadCap(team)
  totalTeamSalary += calculateIncomingSalary(team)
  totalTeamSalary -= calculateOutgoingSalary(team)

  return totalTeamSalary
}

export const calculateIncomingSalary = (team) => {
  let incomingSalary = 0
  if (team.targetAssets) {
    team.targetAssets.forEach(asset =>{
      if (asset.name) {
        if (asset.contracts[0].seasons && asset.contracts[0].seasons[0]) {
          incomingSalary += asset.contracts[0].seasons[0].salary
        }
      }
    })
  }
  return incomingSalary
}

export const calculateOutgoingSalary = (team) => {
  let outgoingSalary = 0
  team.players.forEach(player => {
    if (player.currentTarget) {
      outgoingSalary += player.contracts[0].seasons[0].salary
    }
  })
  return outgoingSalary
}

export const calculateActivePlayerSalary = (team) => {
  let activeSalary = 0
  team.players.forEach(player => {
    if (player.contracts[0].active) {
      activeSalary += player.contracts[0].seasons[0].salary
    }
  })
  return activeSalary
}

export const calculateCapHolds = (team) => {
  let capHolds = 0
  team.players.forEach(player => {
    if (!player.contracts[0].active && !player.contracts[0].dead_seasons[0]) {
      capHolds += player.contracts[0].cap_hold
    }
  })

  return capHolds
}

export const calculateDeadCap = (team) => {
  let deadCap = 0
  team.players.forEach(player => {
    if (!player.contracts[0].active && player.contracts[0].dead_seasons[0]) {
      deadCap += player.contracts[0].dead_seasons[0].cap_hit
    }
  })

  return deadCap
}
