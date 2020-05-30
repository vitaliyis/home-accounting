import {UPDATE_CATEGORIES, UPDATE_EVENTS} from "./records.types";

const initialState = {
  categories: [],
  events: []
}

const recordsReducer = (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: payload
      }

    case UPDATE_EVENTS:
      return {
        ...state,
        events: payload
      }

    default:
      return state
  }

}

export default recordsReducer