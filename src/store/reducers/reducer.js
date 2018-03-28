import * as actionTypes from '../actions/actionTypes'

const initialState = {
  allTeams: [],
  tradeTeams: [],
  appDate: new Date(),
  seasonIndex: 0,
  seasonInfo: {
    season: '2017-2018',
    salaryCap: 99093000,
    luxuryTax: 119266000,
    apron: 125266000
  }
}

const SEASON_STRING = ['2017-2018','2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023']
const SALARY_CAP_FIGURES = [99093000, 101000000, 108000000]
const LUXURY_TAX_FIGURES = [119266000, 123000000, 131000000]
const APRON_FIGURES = [125266000, 129000000, 137000000]

const reducer = (state = initialState, action) => {
  const tradeTeams = JSON.parse(JSON.stringify(state.tradeTeams))

  switch (action.type) {
    case actionTypes.LOAD_TEAMS:
      const allTeams = action.teams
      return {
        ...state,
        allTeams: allTeams
      }

    case actionTypes.LOAD_TRADE_TEAM_DATA:
      const selectedTeam = action.team

      if (state.seasonIndex > 0) {
        selectedTeam.players.forEach(player => {
          if (player.contracts[0].seasons.length <= state.seasonIndex) {
            player.contracts[0].active = false
            player.contracts[0].cap_hold = player.contracts[0].seasons[0].salary
          }
          player.contracts[0].seasons.splice(0,state.seasonIndex)
        })
      }

      var found = false;
      for(var i = 0; i < state.tradeTeams.length; i++) {
        if (state.tradeTeams[i].id === selectedTeam.id) {
          found = true;
          break;
        }
      }

      let toAddOrRemove = null

      if (found) {
        toAddOrRemove = state.tradeTeams.filter((team)=> team.id !== selectedTeam.id)
      } else {
        toAddOrRemove = state.tradeTeams.concat(selectedTeam)
      }

      return {
        ...state,
        tradeTeams: toAddOrRemove
      }

      case actionTypes.REMOVE_ALL_TRADE_TEAMS:

      return {
        ...state,
        tradeTeams: []
      }

    case actionTypes.ADD_ASSET_TO_TRADE:
    console.log(tradeTeams);
      tradeTeams.forEach(team=> {
        if (team.id === action.current_team_id) {
          if (action.asset.name) {
            for (let i = 0; i < team.players.length; i++){
              if (team.players[i].id === action.asset.id) {
                team.players[i].currentTarget = action.new_team.team_name
              }
            }
          }
          if (action.asset.round) {
            for (let i = 0; i < team.draftpicks.length; i++){
              if (team.draftpicks[i].id === action.asset.id) {
                team.draftpicks[i].currentTarget = action.new_team.team_name
              }
            }
          }
        }
      })
      // add traded player to newTeam target list
      tradeTeams.forEach(team => {
        if (team.id === action.new_team.id) {
          if (!team.targetAssets) {
            team.targetAssets =[]
          }
          team.targetAssets.push(action.asset)
        }
      })

      return {
        ...state,
        tradeTeams: tradeTeams
      }

    case actionTypes.REMOVE_TRADE_ASSET:
    // remove player from target assets
      tradeTeams.forEach( team => {
        if (team.targetAssets) {
          team.targetAssets = team.targetAssets.filter( asset => {
            if (asset.name) {
              return asset.name !== action.asset.name
            }
            if (asset.round) {
              return asset.id !== action.asset.id
            }
            return null
          })
          return null
        }
        return null
      })
      // add player back to players list
     tradeTeams.forEach( team => {
        if (team.id === action.asset.team_id) {
          if (action.asset.name) {
            team.players.forEach( player => {
              if (action.asset.id === player.id){
                player.currentTarget = false
              }
            })
          }
          if (action.asset.round) {
            team.draftpicks.forEach( pick => {
              if (action.asset.id === pick.id) {
                pick.currentTarget = false
              }
            })
          }
        }
      })

      return {
        ...state,
        tradeTeams: tradeTeams
      }

      case actionTypes.WAIVE_PLAYER:

      const julyOrAugust = () => {
        return state.appDate.getMonth() === 6 || state.appDate.getMonth() === 7 ? true : false
      }

      const waiveTeam = tradeTeams.filter(team => team.id === action.player.team_id)[0]
      let playerToWaive = waiveTeam.players.filter(player => player.id === action.player.id)[0]

      let guaranteedSalaryRemaining = playerToWaive.contracts[0].seasons.slice(0).reduce((prev, season)=>{
        return prev + season.guaranteed_salary
      }, 0)

      let waiveSeasons = playerToWaive.contracts[0].seasons.length

      if (!action.stretch) {
        for (let i = 0; i < waiveSeasons; i++) {
          let obj = {}
          obj.season = SEASON_STRING[i]
          obj.player_id = playerToWaive.id
          obj.team_id = waiveTeam.id
          obj.cap_hit = playerToWaive.contracts[0].seasons[i].guaranteed_salary
          playerToWaive.contracts[0].dead_seasons.push(obj)
        }
      }

      if (action.stretch) {
        let stretchSeasons = waiveSeasons * 2 + 1
        if (julyOrAugust()) {
          for (let i = 0; i < stretchSeasons; i++) {
            console.log(i);
            let obj = {}
            obj.season = SEASON_STRING[i]
            obj.player_id = playerToWaive.id
            obj.team_id = waiveTeam.id
            obj.cap_hit = guaranteedSalaryRemaining / stretchSeasons
            playerToWaive.contracts[0].dead_seasons.push(obj)
          }
        } else {
          let currentSeasonSalary = playerToWaive.contracts[0].seasons[0].guaranteed_salary
          guaranteedSalaryRemaining = guaranteedSalaryRemaining - currentSeasonSalary
          for (let i = 0; i < stretchSeasons; i++) {
            let obj = {}
            obj.season = SEASON_STRING[i]
            obj.player_id = playerToWaive.id
            obj.team_id = waiveTeam.id
            obj.cap_hit = guaranteedSalaryRemaining / stretchSeasons
            playerToWaive.contracts[0].dead_seasons.push(obj)
          }
          playerToWaive.contracts[0].dead_seasons[0].cap_hit = currentSeasonSalary
        }
      }

      playerToWaive.contracts[0].active = false
      playerToWaive.contracts[0].seasons = []

      return {
        ...state,
        tradeTeams: tradeTeams
      }

      case actionTypes.CHANGE_DATE:
      const updatedAppDate = new Date(action.year, action.month, action.day)

      let updatedSeasonIndex = state.seasonIndex

      if (state.appDate.getMonth() < 5 && updatedAppDate.getMonth() > 5 ) {
        updatedSeasonIndex = state.seasonIndex + 1
      }

      updatedSeasonIndex += updatedAppDate.getFullYear() - state.appDate.getFullYear()

      return {
        ...state,
        appDate: updatedAppDate,
        seasonIndex: updatedSeasonIndex
      }

      case actionTypes.SET_SEASON:

      return {
        ...state,
        seasonInfo: {
          season: SEASON_STRING[state.seasonIndex],
          salaryCap: SALARY_CAP_FIGURES[state.seasonIndex],
          luxuryTax: LUXURY_TAX_FIGURES[state.seasonIndex],
          apron: APRON_FIGURES[state.seasonIndex]
        }
      }

      case actionTypes.RENOUNCE_CAP_HOLD:
      console.log('renounce cap hold');
      const renounceTeam = tradeTeams.filter(team => team.id === action.player.team_id)[0]
      let playerToRenounce = renounceTeam.players.filter(player => player.id === action.player.id)[0]
      playerToRenounce.contracts[0].cap_hold = 0
      playerToRenounce.team_id = null


      return {
        ...state,
        tradeTeams: tradeTeams
      }

    default:
      return state
  }
}

export default reducer
