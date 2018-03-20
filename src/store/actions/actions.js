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

export const addPlayerToTrade = (player, team) => {
  return {
    type: actionTypes.ADD_PLAYER_TO_TRADE,
    player: player,
    team: team
  }
}

export const addDraftPickToTrade = (draftpick, team, original_team) => {
  return {
    type: actionTypes.ADD_DRAFTPICK_TO_TRADE,
    draftpick: draftpick,
    team: team,
    original_team: original_team
  }
}

export const addAssetToTrade = (asset, new_team, original_team) => {
  return {
    type: actionTypes.ADD_ASSET_TO_TRADE,
    asset: asset,
    new_team: new_team,
    original_team: original_team
  }
}

export const removeTradeAsset = (asset) => {
  return {
    type: actionTypes.REMOVE_TRADE_ASSET,
    asset: asset
  }
}
