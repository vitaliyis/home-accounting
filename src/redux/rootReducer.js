import {combineReducers} from 'redux'
import authReducer from "./reducers/auth/auth.reducer";
import billReducer from "./reducers/bill/bill.reducer";
import recordsReducer from "./reducers/records/records.reducer";

export default combineReducers ({
  authReducer,
  billReducer,
  recordsReducer
})