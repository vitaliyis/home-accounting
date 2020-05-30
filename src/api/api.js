import {BaseApi} from "./base-api";

export const getUserByEmailApi = email => {
  return BaseApi.get(`users?email=${email}`)
}

export const createNewUserApi = user => {
  return BaseApi.post('users', user)
}

export const checkEmail = email => {
  return getUserByEmailApi(email)
    .then(user => {
      if (!user.length) {
        return ''
      } else {
        return 'Email уже занят!'
      }
      })
    .catch(err => console.log('Error in checkEmail: ', err))
}

export const getBillApi = () => {
  return BaseApi.get('bill')
}

export const updateBillApi = bill => {
    return BaseApi.put('bill', bill)
}

export const addCategoryApi = category => {
  return BaseApi.post('categories', category)
}

export const getCategoriesApi = () => {
  return BaseApi.get('categories')
}

export const updateCategoryApi = category => {
  return BaseApi.put(`categories/${category.id}`, category)
}

export const addEventApi = event => {
    return BaseApi.post('events', event)
}

export const getEventsApi = () => {
  return BaseApi.get('events')
}

const apiKeyForCurrency = '0033fbba810538f2b894e2fc62b2a37c'
export const getCurrencyApi = () => {
  return fetch(`http://data.fixer.io/api/latest?access_key=${apiKeyForCurrency}`)
    .then(response => response.json())
    .catch(err => console.log('error in getCurrencyApi: ', err))
}

