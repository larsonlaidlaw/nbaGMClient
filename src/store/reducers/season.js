import * as actionTypes from '../actions/actionTypes'

const initialState = {
  season: '2018-2019'
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ACTION:

      return {
        ...state,
      }

    default:
      return state
  }
}

export default reducer
