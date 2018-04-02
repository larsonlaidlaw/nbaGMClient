export const maxStartingSalary = (player, seasonInfo) => {
  let startingSalary = 0
  let salaryCap = seasonInfo.salaryCap

  if (player.experience <= 6) {
    startingSalary = .25 * salaryCap
  }
  if (player.experience >= 7 && player.experience <= 9) {
    startingSalary = .3 * salaryCap
  }
  if (player.experience >= 10) {
    startingSalary = .35 * salaryCap
  }
  return startingSalary
}
