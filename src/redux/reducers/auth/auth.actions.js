import {createNewUserApi, getUserByEmailApi} from "../../../api/api";
import {SET_AUTH, SET_NOW_CAN_LOGIN, UPDATE_ERROR_USER, UPDATE_iS_FETCHING, UPDATE_USER} from "./auth.types";

export const updateUser = payload => {
  return {
    type: UPDATE_USER,
    payload
  }
}

export const updateErrorUser = payload => {
  return {
    type: UPDATE_ERROR_USER,
    payload
  }
}

export const setNowCanLogin = payload => {
  return {
    type: SET_NOW_CAN_LOGIN,
    payload
  }
}

export const updateIsFetching = payload => {
  return {
    type: UPDATE_iS_FETCHING,
    payload
  }
}

// export const setAuth = payload => {
//   return {
//     type: SET_AUTH,
//     payload
//   }
// }

export const getUserByEmail = (email, password) => dispatch =>{
  dispatch(updateIsFetching(true))
  return getUserByEmailApi(email)
    .then(user => {
      if (!user.length) {
        dispatch(updateErrorUser('Такого пользователя не существует!'))
        setTimeout(() => {dispatch(updateErrorUser(''))}, 5000)
      }else if(user[0].password !== password) {

        dispatch(updateErrorUser('Пароль неверный!'))
        setTimeout(() => {dispatch(updateErrorUser(''))}, 5000)

      } else {
        dispatch(updateErrorUser(''))
        dispatch(updateUser(user))
        localStorage.setItem('user', JSON.stringify(user))
      }

      dispatch(updateIsFetching(false))
    })
    .catch(err => console.log('Error in getUserByEmail: ', err))
}

export const createNewUser = user => dispatch => {
  dispatch(updateIsFetching(true))
  return createNewUserApi(user)
    .then(() => {
      // redirect с последующим выводом сообщения
      dispatch(setNowCanLogin("Теперь вы можете зайти в систему"))
      setTimeout(() => {dispatch(setNowCanLogin(''))}, 5000)
      dispatch(updateIsFetching(false))
    })
    .catch(err => console.log('Error in createNewUser: ', err))

}

export const getUser = () => dispatch => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    dispatch(updateUser(user))
  }
}

export const logout = () => dispatch => {
  localStorage.clear()
  dispatch(updateUser(null))
}

