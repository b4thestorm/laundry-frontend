import * as actionTypes from '../constants/action-types'

const initialState = {
  token: {token: null, loggedIn: null}
}

export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.LOGIN:
      return {...state, token:payload, loggedIn: true};
    case actionTypes.LOGOUT:
      return {token: null, loggedIn: false};
    default:
      return state;
  }
}
