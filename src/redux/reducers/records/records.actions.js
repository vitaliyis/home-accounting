import {UPDATE_CATEGORIES, UPDATE_EVENTS} from "./records.types";
import {addCategoryApi, getCategoriesApi, getEventsApi} from "../../../api/api";

export const updateCategories = payload => {
  return {
    type: UPDATE_CATEGORIES,
    payload
  }
}

export const getCategories = () => dispatch => {
  return getCategoriesApi()
    .then(categories => dispatch(updateCategories(categories)))
    .catch(err => console.log(err))
}

export const updateEvents = payload => {
  return {
    type: UPDATE_EVENTS,
    payload
  }
}

export const getEvents = () => dispatch => {
  return getEventsApi()
    .then(events => dispatch(updateEvents(events)))
    .catch(err => console.log(err))
}
