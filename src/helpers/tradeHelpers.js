import * as seasonInfo from './seasonInfo'
import * as teamSalaryHelpers from './teamSalaryHelpers'
import * as helpers from './helpers'

export const isTradeValid = (team, seasonInfo) => {
  if (teamSalaryHelpers.isUnderSalaryCap(team, seasonInfo)) {
    return true
  }

  if (teamSalaryHelpers.isUnderLuxuryTax(team, seasonInfo)) {
    return nonTaxPaying(team)
  }

  if (!teamSalaryHelpers.isUnderLuxuryTax(team, seasonInfo)) {
    return taxPaying(team)
  }
}

export const transactionFeedback = (team, seasonInfo) => {
  let message = ''

  if (teamSalaryHelpers.isUnderSalaryCap(team, seasonInfo)) {
    message = `the ${team.team_name} are under the Salary Cap`
  }

  if (teamSalaryHelpers.isUnderLuxuryTax(team, seasonInfo)) {
    message = `the ${team.team_name} over the Salary Cap but not yet into the Luxury Tax`
  }

  if (!teamSalaryHelpers.isUnderLuxuryTax(team, seasonInfo)) {
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
  if (teamSalaryHelpers.isUnderLuxuryTax(team, seasonInfo)) {
    if ((calculateIncomingSalary(team) - 100000) / 1.75 < 6533333 ) {
      return (calculateIncomingSalary(team) - 100000) / 1.75
    }

    if ((calculateIncomingSalary(team) - 5000000) > 6533333 && (calculateIncomingSalary(team) - 5000000) < 19600000 ) {
      return  calculateIncomingSalary(team) - 5000000
    }

    if ((calculateIncomingSalary(team) - 100000) / 1.25 > 19600000) {
      return (calculateIncomingSalary(team) - 100000) / 1.25
    }
  } else {
    return (calculateIncomingSalary(team) - 100000) / 1.25
  }
}

export const nonTaxPaying = (team) => {
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
  return calculateOutgoingSalary(team) * 1.25 + 100000 >= calculateIncomingSalary(team) ? true : false
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
