import * as actionTypes from '../actions/actionTypes'

const initialState = {
  allTeams: [],
  tradeTeamData: [],
}

const teamSelector = (state = initialState, action) => {
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
    const newState = JSON.parse(JSON.stringify(state))

    const oldTeam = action.player.team_id
    const tradedPlayer = action.player.id

    // remove traded player from teamlist
    newState.tradeTeamData.forEach(team=> {
      if (team.id === oldTeam) {
        for (let i = 0; i < team.players.length; i++){
          if (team.players[i].id === tradedPlayer) {
            team.players.splice(i, 1)
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

    const oldTeam2 = action.draftpick.team_id
    const tradedPick = action.draftpick.id

    const newState2 = JSON.parse(JSON.stringify(state))

    newState2.tradeTeamData.forEach( team => {
      if (team.id === oldTeam2) {
        for (let i = 0; i < team.draftpicks.length; i++){
          if (team.draftpicks[i].id === tradedPick) {
            team.draftpicks.splice(i, 1)
          }
        }
      }
    })

    newState2.tradeTeamData.forEach( team => {
      if (team.id === action.team.id) {
        if (!team.targetAssets) {
          team.targetAssets = []
        }
        team.targetAssets.push(action.draftpick)
      }
    })


    return {
      ...newState2
    }

    default:
      return state
  }
}

export default teamSelector
