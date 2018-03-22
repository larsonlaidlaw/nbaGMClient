import * as actionTypes from '../actions/actionTypes'

const initialState = {
  allTeams: [],
  tradeTeams: [],
  appDate: new Date()
}

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
          })
        }
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

      case actionTypes.CHANGE_DATE:
      const newAppDate = new Date(action.date)

      return {
        ...state,
        appDate : newAppDate
      }

      return {
        ...state
      }

    default:
      return state
  }
}

export default reducer
