import * as actionTypes from '../actions/actionTypes'
import * as contractEndingHelpers from '../../helpers/contractEndingHelpers'
import * as seasonInfo from '../../helpers/seasonInfo'


const initialState = {
  allTeams: [],
  tradeTeams: [],
  appDate: new Date(),
  seasonIndex: 0,
  freeAgents: [],
  seasonInfo: {
    season: seasonInfo.SEASON_STRING[0],
    salaryCap: seasonInfo.SALARY_CAP_FIGURES[0],
    luxuryTax: seasonInfo.LUXURY_TAX_FIGURES[0],
    apron: seasonInfo.APRON_FIGURES[0]
  }
}

const reducer = (state = initialState, action) => {
  const tradeTeams = JSON.parse(JSON.stringify(state.tradeTeams))
  const freeAgents = JSON.parse(JSON.stringify(state.freeAgents))

  let grabTeam
  let grabPlayer


  if (action.player) {
    grabTeam = tradeTeams.filter(tradeTeam => tradeTeam.id === action.player.team_id)[0]
    grabPlayer = grabTeam.players.filter(player => player.id === action.player.id)[0]
  }

  if (action.freeAgent) {
    grabTeam = tradeTeams.filter(tradeTeam => tradeTeam.id === action.team.id)[0]
  }

  switch (action.type) {
    case actionTypes.LOAD_TEAMS:
      const allTeams = action.teams
      return {
        ...state,
        allTeams: allTeams
      }

    case actionTypes.LOAD_TRADE_TEAM_DATA:
      const selectedTeam = action.team

      var found = false

      for(var i = 0; i < tradeTeams.length; i++) {
        if (tradeTeams[i].id === selectedTeam.id) {
          found = true;
          break;
        }
      }

      if (found === false) {
        if (state.seasonIndex > 0) {
          selectedTeam.players.forEach(player => {
            player.experience += 1
            if (player.contracts[0].seasons.length <= state.seasonIndex) {
              player.contracts[0].active = false
              //should add this to the rails tables
              player.contracts[0].previousSeasonSalary = player.contracts[0].seasons[0].salary
              // player.contracts[0].cap_hold = player.contracts[0].seasons[0].salary
              player.contracts[0].cap_hold = contractEndingHelpers.calculateCapHold(player)
            }
            player.contracts[0].seasons.splice(0,state.seasonIndex)
          })
        }
      }

      let toAddOrRemove = null

      if (found) {
        toAddOrRemove = tradeTeams
      } else {
        toAddOrRemove = tradeTeams.concat(selectedTeam)
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
          action.asset.newContract = true
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

        let guaranteedSalaryRemaining = grabPlayer.contracts[0].seasons.slice(0).reduce((prev, season)=>{
          return prev + season.guaranteed_salary
        }, 0)

        let waiveSeasons = grabPlayer.contracts[0].seasons.length

        if (!action.stretch) {
          for (let i = 0; i < waiveSeasons; i++) {
            let obj = {}
            obj.season = seasonInfo.SEASON_STRING[i]
            obj.player_id = grabPlayer.id
            obj.team_id = grabTeam.id
            obj.cap_hit = grabPlayer.contracts[0].seasons[i].guaranteed_salary
            grabPlayer.contracts[0].dead_seasons.push(obj)
          }
        }

        if (action.stretch) {
          let stretchSeasons = waiveSeasons * 2 + 1
          if (julyOrAugust()) {
            for (let i = 0; i < stretchSeasons; i++) {
              console.log(i);
              let obj = {}
              obj.season = seasonInfo.SEASON_STRING[i]
              obj.player_id = grabPlayer.id
              obj.team_id = grabTeam.id
              obj.cap_hit = guaranteedSalaryRemaining / stretchSeasons
              grabPlayer.contracts[0].dead_seasons.push(obj)
            }
          } else {
            let currentSeasonSalary = grabPlayer.contracts[0].seasons[0].guaranteed_salary
            guaranteedSalaryRemaining = guaranteedSalaryRemaining - currentSeasonSalary
            for (let i = 0; i < stretchSeasons; i++) {
              let obj = {}
              obj.season = seasonInfo.SEASON_STRING[i]
              obj.player_id = grabPlayer.id
              obj.team_id = grabTeam.id
              obj.cap_hit = guaranteedSalaryRemaining / stretchSeasons
              grabPlayer.contracts[0].dead_seasons.push(obj)
            }
            grabPlayer.contracts[0].dead_seasons[0].cap_hit = currentSeasonSalary
          }
        }

        grabPlayer.contracts[0].active = false
        grabPlayer.contracts[0].seasons = []

        return {
          ...state,
          tradeTeams: tradeTeams
        }

      case actionTypes.CHANGE_DATE:
      console.log(action.year, action.month, action.day)
      console.log(state.seasonIndex)
        const updatedAppDate = new Date(action.year, action.month, action.day)
        console.log(updatedAppDate)

        let updatedSeasonIndex = state.seasonIndex

        if (state.appDate.getMonth() < 6 && updatedAppDate.getMonth() > 5 ) {
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
            season: seasonInfo.SEASON_STRING[state.seasonIndex],
            salaryCap: seasonInfo.SALARY_CAP_FIGURES[state.seasonIndex],
            luxuryTax: seasonInfo.LUXURY_TAX_FIGURES[state.seasonIndex],
            apron: seasonInfo.APRON_FIGURES[state.seasonIndex]
          }
        }

      case actionTypes.RENOUNCE_CAP_HOLD:
        grabPlayer.contracts[0].cap_hold = 0
        grabPlayer.team_id = null


        return {
          ...state,
          tradeTeams: tradeTeams
        }

      case actionTypes.OPT_OUT_PLAYER_CONTRACT:
        grabPlayer.contracts[0].active = false
        // grabPlayer.contracts[0].cap_hold = grabPlayer.contracts[0].seasons[0].salary
        grabPlayer.contracts[0].cap_hold = contractEndingHelpers.calculateCapHold(grabPlayer)
        grabPlayer.contracts.seasons = []
        freeAgents.push(grabPlayer)

        return {
          ...state,
          tradeTeams: tradeTeams,
          freeAgents: freeAgents
        }

      case actionTypes.OPT_IN_PLAYER_CONTRACT:
        grabPlayer.contracts[0].seasons[0].player_option = false

        return {
          ...state,
          tradeTeams: tradeTeams
        }

      case actionTypes.PICK_UP_TEAM_OPTION:
        grabPlayer.contracts[0].seasons[0].team_option = false

        return {
          ...state,
          tradeTeams: tradeTeams
        }

      case actionTypes.DECLINE_TEAM_OPTION:
        grabPlayer.contracts[0].seasons[0].team_option = false
        grabPlayer.contracts[0].cap_hold = contractEndingHelpers.calculateCapHold(grabPlayer)
        grabPlayer.contracts.seasons = []
        freeAgents.push(grabPlayer)

        return {
          ...state,
          tradeTeams: tradeTeams,
          freeAgents: freeAgents
        }

        case actionTypes.CREATE_NEW_CONTRACT:

          if (action.freeAgent.team_id === action.team.id) {
            grabTeam.players = grabTeam.players.filter(player => player.id !== action.freeAgent.id)
          } else {
            let oldTeam = tradeTeams.filter(team => team.id === action.freeAgent.team_id)[0]
            console.log(oldTeam)
            console.log(oldTeam.players)
            oldTeam.players = oldTeam.players.filter(player => player.id !== action.freeAgent.id)
          }

          action.freeAgent.team_id = action.team.id
          action.freeAgent.newContract = true
          grabTeam.players.unshift(action.freeAgent)

          state.freeAgents = state.freeAgents.filter(player => player.id !== action.freeAgent.id)


          return {
            ...state,
            tradeTeams: tradeTeams
          }

      case actionTypes.LOAD_FREE_AGENTS:
        let freeAgentList = action.freeAgents

        if (state.seasonIndex > 0) {
          freeAgentList.forEach(player => {
            if (player.contracts[0].seasons.length <= state.seasonIndex) {
              player.contracts[0].active = false
              // player.contracts[0].cap_hold = player.contracts[0].seasons[0].salary
            }
            player.contracts[0].seasons.splice(0,state.seasonIndex)
            player.experience += 1
          })
        }

        freeAgentList = freeAgentList.filter( player => player.contracts[0].active  === false)

      return {
        ...state,
        freeAgents: freeAgentList
      }

      case actionTypes.HIDE_TEAM:
      console.log(tradeTeams)

      var found = false

      for(var i = 0; i < state.tradeTeams.length; i++) {
        if (tradeTeams[i].id === action.team.id) {
          if (tradeTeams[i].hide) {
            tradeTeams[i].hide = false
          } else {
            tradeTeams[i].hide = true
          }
          found = true;
          break;
        }
      }

      return {
        ...state,
        tradeTeams: tradeTeams
      }

    default:
      return state
  }
}

export default reducer
