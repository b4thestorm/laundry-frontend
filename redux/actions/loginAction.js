import * as actionTypes from "root/redux/constants/action-types";

export const login = (token) => {
  return {
    type: actionTypes.LOGIN,
    payload: token
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    payload: {token: null, loggedIn: false}
  }
}
