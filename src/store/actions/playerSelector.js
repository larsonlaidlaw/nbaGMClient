// import axios from 'axios'
import * as actionTypes from './actionTypes'

export const addPlayerToTrade = (player) => {
  console.log('add player to trade');
  return {
    type: actionTypes.ADD_PLAYER_TO_TRADE,
    player: player
  }
}
