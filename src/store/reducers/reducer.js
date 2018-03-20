import * as actionTypes from '../actions/actionTypes'

const initialState = {
  allTeams: [],
  tradeTeamData: [],
}

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state))

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
    for(var i = 0; i < state.tradeTeamData.length; i++) {
      if (state.tradeTeamData[i].id === selectedTeam.id) {
        found = true;
        break;
      }
    }

    let toAddOrRemove = null

    if (found) {
      toAddOrRemove = state.tradeTeamData.filter((team)=> team.id !== selectedTeam.id)
    } else {
      toAddOrRemove = state.tradeTeamData.concat(selectedTeam)
    }

    return {
      ...state,
      tradeTeamData: toAddOrRemove
    }

    case actionTypes.ADD_PLAYER_TO_TRADE:

    const oldTeam = action.player.team_id
    const tradedPlayer = action.player.id
    // remove traded player from teamlist
    newState.tradeTeamData.forEach(team=> {
      if (team.id === oldTeam) {
        for (let i = 0; i < team.players.length; i++){
          if (team.players[i].id === tradedPlayer) {
            team.players[i].currentTarget = action.team.team_name
          }
        }
      }
    })
    // add traded player to newTeam target list
    newState.tradeTeamData.forEach(team => {
      if (team.id === action.team.id) {
        if (!team.targetAssets) {
          team.targetAssets = []
        }
        team.targetAssets.push(action.player)
      }
    })

    return {
      ...newState,
    }

    case actionTypes.ADD_DRAFTPICK_TO_TRADE:

    const newState2 = JSON.parse(JSON.stringify(state))
    const oldTeam2 = action.draftpick.team_id
    const tradedPick = action.draftpick.id

    newState.tradeTeamData.forEach( team => {
      if (team.id === oldTeam2) {
        for (let i = 0; i < team.draftpicks.length; i++){
          if (team.draftpicks[i].id === tradedPick) {
            team.draftpicks[i].currentTarget = true
          }
        }
      }
    })

    newState.tradeTeamData.forEach( team => {
      if (team.id === action.team.id) {
        if (!team.targetAssets) {
          team.targetAssets = []
        }
        team.targetAssets.push(action.draftpick)
      }
    })

    return {
      ...newState
    }

    case actionTypes.REMOVE_TRADE_ASSET:

    // remove player from target assets
    newState.tradeTeamData.forEach( team => {
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
    newState.tradeTeamData.forEach( team => {
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
      ...newState
    }

    default:
      return state
  }
}

export default reducer
