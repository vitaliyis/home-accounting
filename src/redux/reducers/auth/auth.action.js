import {
  SET_NOW_CAN_LOGIN,
  UPDATE_AGREE,
  UPDATE_EMAIL, UPDATE_ERROR_AGREE, UPDATE_ERROR_EMAIL, UPDATE_ERROR_NAME, UPDATE_ERROR_PASSWORD, UPDATE_ERROR_USER,
  UPDATE_ERRORS,
  UPDATE_NAME,
  UPDATE_PASSWORD,
  UPDATE_USER
} from "./auth.types";
import {createNewUserApi, getUserByEmailApi} from "../../../api/api";

export const updateEmail = payload => {
  return {
    type: UPDATE_EMAIL,
    payload
  }
}

export const updatePassword = payload => {
  return {
    type: UPDATE_PASSWORD,
    payload
  }
}

export const updateErrorEmail = payload => {
  return {
    type: UPDATE_ERROR_EMAIL,
    payload
  }
}

export const updateErrorPassword = payload => {
  return {
    type: UPDATE_ERROR_PASSWORD,
    payload
  }
}

export const updateErrors = payload => {
  return {
    type: UPDATE_ERRORS,
    payload
  }
}

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

export const updateName = payload => {
  return {
    type: UPDATE_NAME,
    payload
  }
}

export const updateErrorName = payload => {
  return {
    type: UPDATE_ERROR_NAME,
    payload
  }
}

export const updateAgree = payload => {
  return {
    type: UPDATE_AGREE,
    payload
  }
}

export const updateErrorAgree = payload => {
  return {
    type: UPDATE_ERROR_AGREE,
    payload
  }
}

export const setNowCanLogin = payload => {
  return {
    type: SET_NOW_CAN_LOGIN,
    payload
  }
}

export const getUserByEmail = (email, password) => dispatch => {
  getUserByEmailApi(email)
    .then(user => {
      if (!user.length) {

        dispatch(updateErrorUser('Такого пользователя не существует!'))
        setTimeout(() => {dispatch(updateErrorUser(''))}, 5000)

      } else if(user[0].password !== password) {

        dispatch(updateErrorUser('Пароль неверный!'))
        setTimeout(() => {dispatch(updateErrorUser(''))}, 5000)
        
      } else {
        dispatch(updateErrorUser(''))
        dispatch(updateUser(user))
        localStorage.setItem('user', JSON.stringify(user))
      }
    })
    .catch(err => console.log('Error in getUserByEmail: ', err))
}

export const createNewUser = user => dispatch => {
  createNewUserApi(user)
  // redirect с последующим выводом сообщения
  dispatch(setNowCanLogin("Теперь вы можете зайти в систему"))
  setTimeout(() => {dispatch(setNowCanLogin(''))}, 5000)
}

export const checkEmail = email => dispatch => {
  getUserByEmailApi(email)
    .then(user => {
      console.log('user[0].email ', user)
      console.log('email ', email)
      if (user[0].email === email) {
        dispatch(updateErrorEmail('Email уже занят!'))
      } else {
        dispatch(updateErrorEmail(''))
      }
    })
    .catch(err => console.log('Error in checkEmail: ', err))
}