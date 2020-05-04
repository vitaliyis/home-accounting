import {SET_NOW_CAN_LOGIN, UPDATE_ERROR_USER, UPDATE_iS_FETCHING, UPDATE_USER} from "./auth.types";

const initialState = {
  user: null,
  userError: '',
  nowCanLogin: '',
  isFetching: false
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

    default:
      return state
  }

}

export default authReducer