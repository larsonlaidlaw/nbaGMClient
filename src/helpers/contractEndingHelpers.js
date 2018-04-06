import * as seasonInfo from './seasonInfo'
import * as newContractHelpers from './newContractHelpers'

export const calculateMinimumCaphold = (player) => {
  let experience = player.experience

  if (experience > 2) {
    experience = 2
  }

  let cap_hold = seasonInfo.MINIMUM_SALARIES[experience]
  return cap_hold
}

export const calculateMinimumCapHit = (player) => {
  let experience = player.experience

  if (experience > 2) {
    experience = 2
  }

  let cap_hit = seasonInfo.MINIMUM_SALARIES[experience]
  return cap_hit
}

export const calculateCapHold = (player) => {
  let cap_hold = player.contracts[0].seasons[0].salary

  if (player.experience < 4) {

  } else if (player.experience === 4) {
    if (cap_hold > seasonInfo.AVERAGE_SALARY) {
      cap_hold = cap_hold * 2.5
    } else {
      cap_hold = cap_hold * 3
    }

  } else if (player.experience > 4) {
    if (cap_hold > seasonInfo.AVERAGE_SALARY) {
      cap_hold = cap_hold * 1.5
    } else {
      cap_hold = cap_hold * 1.9
    }

  } else {
    cap_hold = cap_hold * 1.2
  }

  if (cap_hold > seasonInfo.MAX_SALARY) {
    cap_hold = seasonInfo.MAX_SALARY
  }

  return cap_hold
}
