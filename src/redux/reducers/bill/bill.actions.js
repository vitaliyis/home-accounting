import {UPDATE_BILL, UPDATE_CURRENCY} from "./bill.types";
import {getBillApi, getCurrencyApi, updateBillApi} from "../../../api/api";

export const updateBill = payload => {
  return {
    type: UPDATE_BILL,
    payload
  }
}

export const updateCurrency = payload => {
  return {
    type: UPDATE_CURRENCY,
    payload
  }
}

export const getBill = () => dispatch => {
  return getBillApi()
    .then(bill => {
      dispatch(updateBill(bill))
    })
    .catch(err => console.log('err in getBill: ', err))
}

export const getCurrency = () => dispatch => {
  return getCurrencyApi()
    .then(currency => {
      dispatch(updateCurrency(currency))
    })
    .catch(err => console.log('err in getBill: ', err))
}

export const updateBillInServer = bill => dispatch => {
  return updateBillApi(bill)
      .then(() => {
        dispatch(updateBill(bill))
      })
      .catch(err => console.log(err))
}