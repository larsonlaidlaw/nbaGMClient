import * as seasonConstants from './seasonInfo'
import * as teamSalaryHelpers from './teamSalaryHelpers'
import * as helpers from './helpers'

export const isUnderSalaryApron = (team, seasonInfo, mle) => {
  return seasonInfo.apron > teamSalaryHelpers.calculateTeamTotalSalary(team) + mle ? true : false
}

export const calculatePlayerMaxSalary = (player, seasonInfo) => {
  let maxSalary = 0
  let salaryCap = seasonInfo.salaryCap

  if (player.experience <= 6) {
    maxSalary = .25 * salaryCap
  }

  if (player.experience >= 7 && player.experience <= 9) {
    maxSalary = .3 * salaryCap
  }

  if (player.experience >= 10) {
    maxSalary = .35 * salaryCap
  }
  return Math.round(maxSalary)
}

export const calculatePlayerMinSalary = (player) => {
  let experience = player.experience
  if (experience > 10) {
    experience = 10
  }
  let minSalary = seasonConstants.MINIMUM_SALARIES[experience]
  return Math.round(minSalary)
}

export const whichMidLevel = (team, seasonInfo) => {
  if (seasonInfo.salaryCap > teamSalaryHelpers.calculateTeamTotalSalary(team) + seasonConstants.ROOM_MID_LEVEL_EXCEPTION) {
    return 'ROOM_MID_LEVEL_EXCEPTION'
  }

  if (seasonInfo.apron > teamSalaryHelpers.calculateTeamTotalSalary(team) + seasonConstants.NON_TAXPAYER_MID_LEVEL_EXCEPTION) {
    return 'NON_TAXPAYER_MID_LEVEL_EXCEPTION'
  }

  if (seasonInfo.apron < teamSalaryHelpers.calculateTeamTotalSalary(team) + seasonConstants.NON_TAXPAYER_MID_LEVEL_EXCEPTION) {
    return 'TAXPAYER_MID_LEVEL_EXCEPTION'
  }

  // useCapSpace(player, team, seasonInfo)

}

export const midLevelException = (MLE) => {
  if (MLE === 'ROOM_MID_LEVEL_EXCEPTION') {
    return {
      startingSalary: 4328000,
      maxStartingSalary: 4328000,
      maxContractLength: 2
    }
  }

  if (MLE === 'NON_TAXPAYER_MID_LEVEL_EXCEPTION') {
    return {
      startingSalary: 8406000,
      maxStartingSalary: 8406000,
      maxContractLength: 4
    }
  }

  if (MLE === 'TAXPAYER_MID_LEVEL_EXCEPTION') {
    return {
      startingSalary: 5192000,
      maxStartingSalary: 5192000,
      maxContractLength: 3
    }
  }
}

export const birdRights = (player, team, seasonInfo) => {
  if (player.team_id === team.id) {
    return birdRightsDetails(player, whichBirdRights(player), seasonInfo)
  }
  return false
}

// DO NOT DELETE ******************************
// export const whichBirdRights = (player) => {
//   if (player.bird_rights_clock >= 1) {
//     return 'NON_BIRD_RIGHTS'
//   }
//   if (player.bird_rights_clock >= 2) {
//     return 'EARLY_BIRD_RIGHTS'
//   }
//   if (player.bird_rights_clock >= 3) {
//     return 'BIRD_RIGHTS'
//   }
// }

export const whichBirdRights = (player) => {
  // return 'NON_BIRD_RIGHTS'
  // return 'EARLY_BIRD_RIGHTS'
  return 'BIRD_RIGHTS'
}

export const birdRightsDetails = (player, birdRights, seasonInfo) => {
  console.log(player)
  let playerPreviousSalary = player.contracts[0].previousSeasonSalary
  let playerMinSalary = seasonConstants.MINIMUM_SALARIES[player.experience]
  let averageSalary = seasonConstants.AVERAGE_SALARY
  let playerMax = calculatePlayerMaxSalary(player, seasonInfo)
  if (birdRights === 'NON_BIRD_RIGHTS') {
    return {
      startingSalary: playerPreviousSalary > playerMinSalary ? playerPreviousSalary * 1.2 : playerMinSalary * 1.2,
      maxStartingSalary: playerPreviousSalary > playerMinSalary ? playerPreviousSalary * 1.2 : playerMinSalary * 1.2,
      maxContractLength: 4,
      raises: .05
    }
  }

  if (birdRights === 'EARLY_BIRD_RIGHTS') {
    return {
      startingSalary: playerPreviousSalary * 1.75 > averageSalary * 1.05 ? playerPreviousSalary * 1.75 : averageSalary * 1.05,
      maxStartingSalary: playerPreviousSalary * 1.75 > averageSalary * 1.05 ? playerPreviousSalary * 1.75 : averageSalary * 1.05,
      maxContractLength: 4,
      minContractLength: 2,
      raises: .08
    }
  }

  if (birdRights === 'BIRD_RIGHTS') {
    return {
      startingSalary: playerMax,
      maxStartingSalary: playerMax,
      maxContractLength: 5,
      raises: .08
    }
  }
}

export const useCapSpace = (player, team, seasonInfo) => {
  let capSpace = teamSalaryHelpers.availableCapSpace(team, seasonInfo)
  let playerMax = calculatePlayerMaxSalary(player, seasonInfo)

  return {
    startingSalary: playerMax > capSpace ? capSpace : playerMax,
    maxStartingSalary: playerMax > capSpace ? capSpace : playerMax,
    maxContractLength: 4,
    raises: .05
  }
}
