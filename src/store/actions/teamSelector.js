import axios from 'axios'
import * as actionTypes from './actionTypes'

export const loadTeams = (teams) => {
  return {
    type: actionTypes.LOAD_TEAMS,
    teams: teams
  }
}

export const loadTradeTeamData = (teamData) => {
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
  console.log(`trading ${player.name} to the ${team.team_name}`);
  return {
    type: actionTypes.ADD_PLAYER_TO_TRADE,
    player: player,
    team: team
  }
}
