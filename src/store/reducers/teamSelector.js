import * as actionTypes from '../actions/actionTypes'

const initialState = {
  allTeams: [],
  tradeTeamData: []
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

    default:
      return state
  }
}

export default teamSelector
