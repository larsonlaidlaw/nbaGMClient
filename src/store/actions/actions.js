import axios from 'axios'
import * as actionTypes from './actionTypes'

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
    axios.get(`http://localhost:3000/teams/${team.id}`)
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
