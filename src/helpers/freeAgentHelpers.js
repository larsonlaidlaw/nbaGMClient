const SEASON_STRING = ['2017-2018','2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023']
const SALARY_CAP_FIGURES = [99093000, 101000000, 108000000, 113400000]
const LUXURY_TAX_FIGURES = [119266000, 123000000, 131000000, 137550000]
const APRON_FIGURES = [125266000, 129000000, 137000000, 1000000000]


const AVERAGE_SALARY = [7843500]

const MINIMUM_SALARIES = [815615, 1312611, 1471382, 1524305, 1577230, 1709538, 1841849, 1974159, 2106470, 2116955, 2328652]

export const calculateMinimumSalary = (player) => {
  let minSalary = MINIMUM_SALARIES[player.experience]
  return minSalary
}

export const calculateMinimumCaphold = (player) => {
  let experience = player.experience

  if (experience > 2) {
    experience = 2
  }

  let cap_hold = MINIMUM_SALARIES[experience]
  return cap_hold
}

export const calculateMinimumCapHit = (player) => {
  let experience = player.experience

  if (experience > 2) {
    experience = 2
  }

  let cap_hit = MINIMUM_SALARIES[experience]
  return cap_hit
}

// Years in NBA	Year 1	Year 2	Year 3	Year 4	Year 5
// 0	$815,615
// 1	$1,312,611	$1,378,242
// 2	$1,471,382	$1,544,951	$1,618,520
// 3	$1,524,305	$1,600,520	$1,676,735	$1,752,950
// 4	$1,577,230	$1,656,092	$1,734,954	$1,813,816	$1,892,678
// 5	$1,709,538	$1,795,015	$1,880,492	$1,965,969	$2,051,446
// 6	$1,841,849	$1,933,941	$2,026,033	$2,118,125	$2,210,217
// 7	$1,974,159	$2,072,867	$2,171,575	$2,270,283	$2,368,991
// 8	$2,106,470	$2,211,794	$2,317,118	$2,422,442	$2,527,766
// 9	$2,116,955	$2,222,803	$2,328,651	$2,434,499	$2,540,347
// 10+	$2,328,652	$2,445,085	$2,561,518	$2,677,951	$2,794,384


export const calculateCapHold = (player) => {
  let cap_hold = player.contracts[0].seasons[0].salary

  if (player.experience < 4) {

  } else if (player.experience === 4) {
    if (cap_hold > AVERAGE_SALARY) {
      cap_hold = cap_hold * 2.5
    } else {
      cap_hold = cap_hold * 3
    }

  } else if (player.experience > 4) {
    if (cap_hold > AVERAGE_SALARY) {
      cap_hold = cap_hold * 1.5
    } else {
      cap_hold = cap_hold * 1.9
    }

  } else {
    cap_hold = cap_hold * 1.2
  }
  return cap_hold
}



export const calculateMaximumSalary = () => {

}

export const midLevelException = () => {

}

export const calculateQualifyingOffer = () => {}
