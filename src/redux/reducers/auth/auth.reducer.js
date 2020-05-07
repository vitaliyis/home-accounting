import {SET_AUTH, SET_NOW_CAN_LOGIN, UPDATE_ERROR_USER, UPDATE_iS_FETCHING, UPDATE_USER} from "./auth.types";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  userError: '',
  nowCanLogin: '',
  isFetching: false,
  isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: payload
      }

    case UPDATE_ERROR_USER:
      return {
        ...state,
        userError: payload
      }

    case SET_NOW_CAN_LOGIN:
      return {
        ...state,
        nowCanLogin: payload
      }

    case UPDATE_iS_FETCHING:
      return {
        ...state,
        isFetching: payload
      }

    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: payload
      }

    default:
      return state
  }

}

export default authReducer