import * as tradeHelpers from './tradeHelpers'

export const isUnderSalaryCap = (team, seasonInfo) => {
  return seasonInfo.salaryCap + 100000 > calculateTeamTotalSalary(team) ? true : false
}

export const isUnderLuxuryTax = (team, seasonInfo) => {
  return seasonInfo.luxuryTax > calculateTeamTotalSalary(team) ? true : false
}

export const availableCapSpace = (team, seasonInfo) => {
  return (seasonInfo.salaryCap + 100000) - calculateTeamTotalSalary(team)
}



export const calculateTeamTotalSalary = (team) => {
  let totalTeamSalary = 0

  totalTeamSalary += calculateActivePlayerSalary(team)
  totalTeamSalary+= calculateCapHolds(team)
  totalTeamSalary += calculateDeadCap(team)
  totalTeamSalary += tradeHelpers.calculateIncomingSalary(team)
  totalTeamSalary -= tradeHelpers.calculateOutgoingSalary(team)

  return totalTeamSalary
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
