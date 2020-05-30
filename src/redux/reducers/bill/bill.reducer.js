import {UPDATE_BILL, UPDATE_CURRENCY} from "./bill.types";

const initialState = {
  bill: null,
  currency: null
}

const billReducer = (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
    case UPDATE_BILL:
      return {
        ...state,
        bill: payload
      }

    case UPDATE_CURRENCY:
      return {
        ...state,
        currency: payload
      }

    default:
      return state
  }
}

export default billReducer