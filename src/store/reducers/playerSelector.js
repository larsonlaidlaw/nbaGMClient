import * as actionTypes from '../actions/actionTypes'

const initialState = {
  playerToTrade: []
}

const playerSelector = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYER_TO_TRADE:
    return {
      ...state,

    }

    default:
      return state
  }
}

export default playerSelector
