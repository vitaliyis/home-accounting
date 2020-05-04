import {
  SET_NOW_CAN_LOGIN,
  UPDATE_AGREE,
  UPDATE_EMAIL, UPDATE_ERROR_AGREE, UPDATE_ERROR_EMAIL, UPDATE_ERROR_NAME, UPDATE_ERROR_PASSWORD, UPDATE_ERROR_USER,
  UPDATE_ERRORS,
  UPDATE_NAME,
  UPDATE_PASSWORD,
  UPDATE_USER
} from "./auth.types";

const initialState = {
  values: {
    email: '',
    password: '',
    name: '',
    agree: false
  },
  errors: {
    email: '',
    password: '',
    name: '',
    agree: ''
  },
  user: null,
  userError: '',
  nowCanLogin: ''

}

const authReducer = (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        values: {...state.values, email: payload}
      }

    case UPDATE_PASSWORD:
      return {
        ...state,
        values: {...state.values, password: payload}
      }

    case UPDATE_ERROR_EMAIL:
      return {
        ...state,
        errors: {...state.errors, email: payload}
      }

    case UPDATE_ERROR_PASSWORD:
      return {
        ...state,
        errors: {...state.errors, password: payload}
      }

    case UPDATE_ERRORS:
      return {
        ...state,
        errors: payload
      }

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

    case UPDATE_NAME:
      return {
        ...state,
        values: {...state.values, name: payload}
      }

    case UPDATE_ERROR_NAME:
      return {
        ...state,
        errors: {...state.errors, name: payload}
      }

    case UPDATE_AGREE:
      return {
        ...state,
        values: {...state.values, agree: payload}
      }

    case UPDATE_ERROR_AGREE:
      return {
        ...state,
        errors: {...state.errors, agree: payload}
      }

    case SET_NOW_CAN_LOGIN:
      return {
        ...state,
        nowCanLogin: payload
      }

    default:
      return state
  }
  return state
}

export default authReducer