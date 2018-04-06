export const eligibleForExtension = (player) => {
  if (true) {
    return true
  }
  return false
}

export const hasPlayerOption = (player) => {
  if (player.contracts[0].seasons[0].player_option) {
    return true
  }
  return false
}

export const hasTeamOption = (player) => {
  if (player.contracts[0].seasons[0].team_option) {
    return true
  }
  return false
}

export const playerUnderContract = (player) => {
   if (player.contracts[0].seasons.length >= 1) {
     return true
   }
   return false
 }

export const tradeEligible = (player) => {
  if (false) {
    return false
  }
  return true
}
