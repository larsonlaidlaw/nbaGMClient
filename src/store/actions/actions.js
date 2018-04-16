import axios from 'axios'
import * as actionTypes from './actionTypes'

const BASE_URL = process.env.REACT_APP_API

export const loadTeams = (teams) => {
  return {
    type: actionTypes.LOAD_TEAMS,
    teams: teams
  }
}

const loadTradeTeamData = (teamData) => {
  return {
    type: actionTypes.LOAD_TRADE_TEAM_DATA,
    team: teamData
  }
}

export const initTeamTradeData = (team) => {
  return dispatch => {
    axios.get(`${BASE_URL}/teams/${team.id}`)
    .then(response => {
      dispatch(loadTradeTeamData(response.data))
    })
    .catch( error => {
      console.log(error)
    })
  }
}

export const removeAllTradeTeams = () => {
  return {
    type: actionTypes.REMOVE_ALL_TRADE_TEAMS
  }
}

export const addAssetToTrade = (asset, current_team_id, new_team) => {
  return {
    type: actionTypes.ADD_ASSET_TO_TRADE,
    asset: asset,
    current_team_id: current_team_id,
    new_team: new_team
  }
}

export const removeTradeAsset = (asset) => {
  return {
    type: actionTypes.REMOVE_TRADE_ASSET,
    asset: asset
  }
}

export const waivePlayer = (player, stretch) => {
  return {
    type: actionTypes.WAIVE_PLAYER,
    player: player,
    stretch: stretch
  }
}

export const changeDate = (year, month, day) => {
  return {
    type: actionTypes.CHANGE_DATE,
    year: year,
    month: month,
    day: day
  }
}

export const setSeason = () => {
  return {
    type: actionTypes.SET_SEASON
  }
}

export const renounceCapHold = (player) => {
  return {
    type: actionTypes.RENOUNCE_CAP_HOLD,
    player: player
  }
}

export const loadFreeAgents = (players) => {
  return {
    type: actionTypes.LOAD_FREE_AGENTS,
    freeAgents: players
  }
}

export const initFreeAgents = () => {
  return dispatch => {
    axios.get(`${BASE_URL}/players/`)
    .then(response => {
      dispatch(loadFreeAgents(response.data))
    })
    .catch( error => {
      console.log(error)
    })
  }
}

export const optOutPlayerContract = (player) => {
  return {
    type: actionTypes.OPT_OUT_PLAYER_CONTRACT,
    player: player
  }
}

export const optInPlayerContract = (player) => {
  return {
    type: actionTypes.OPT_IN_PLAYER_CONTRACT,
    player: player
  }
}

export const pickUpTeamOption = (player) => {
  return {
    type: actionTypes.PICK_UP_TEAM_OPTION,
    player: player
  }
}

export const declineTeamOption = (player) => {
  return {
    type: actionTypes.DECLINE_TEAM_OPTION,
    player: player
  }
}


export const createNewContract = (player, team) => {
  return {
    type: actionTypes.CREATE_NEW_CONTRACT,
    freeAgent: player,
    team: team
  }
}

export const hideTeam = (team) => {
  console.log('hide team')
  return {
    type: actionTypes.HIDE_TEAM,
    team: team
  }
}

// export const addTradeTeamFromFreeAgent = () => {
//   return {
//     type: actionTypes.ADD_TRADETEAM_FROM_FREE_AGENT
//   }
// }

export const addTradeTeamFromFreeAgent = (freeAgent, team) => {
  return dispatch => {
    axios.get(`${BASE_URL}/teams/${freeAgent.team_id}`)
    .then(response => {
      dispatch(loadTradeTeamData(response.data))
    })
    .then(response => {
      dispatch(createNewContract(freeAgent, team))
    })
    .catch( error => {
      console.log(error)
    })
  }
}
