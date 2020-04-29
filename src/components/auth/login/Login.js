import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {
  getUserByEmail,
  updateEmail, updateErrorEmail, updateErrorPassword, updateErrors,
  updatePassword
} from "../../../redux/reducers/auth/auth.action";
import MessageAlert from "../MessageAlert";

const Login = (props) => {
  const {valueEmail, valuePassword, updateEmail, updatePassword, updateErrorEmail,
    updateErrorPassword, errorEmail, errorPassword, updateErrors,
    getUserByEmail, userError, nowCanLogin} = props

  const onChange = event => {
    switch (event.target.name) {
      case 'email':
        updateEmail(event.target.value)
        updateErrorEmail('')
        break
      case 'password':
        updatePassword(event.target.value)
        updateErrorPassword('')
        break
      default: break
    }
  }

  const getErrors = () => {
    const errors = {}

    if (!valueEmail) {
      errors.email = 'required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valueEmail)) {
      errors.email = "Invalid email address"
    }

    if (valuePassword.length < 6) {
      errors.password = "Must be 6 characters or more"
    }

    return errors
  }

  const checkError = () => {
    const errors = getErrors()

    if (Object.keys(errors).length > 0) {
      updateErrors(errors)
      return false
    } else {
      updateErrors(errors)
      return true
    }
  }

  const onSubmit = event => {
    event.preventDefault()

    if (checkError()) {
      getUserByEmail(valueEmail, valuePassword)
    }
  }

  const onBlur = (event) => {
    const errors = getErrors()
    if (Object.keys(errors).length > 0) {
      switch (event.target.name) {
        case 'email':
          if (errors.email) {
            updateErrorEmail(errors.email)
          }
          break
        case 'password':
          if (errors.password) {
            updateErrorPassword(errors.password)
          }
          break
        default: break
      }
    }
  }

  return(
    <>
      <p className="text-xs-center">Войдите для работы</p>
      {userError ? <MessageAlert type="danger" message={userError}/> : null}
      {nowCanLogin ? <MessageAlert type="success" message={nowCanLogin}/> : null}
      <form>
        <div className={`form-group ${errorEmail ? "has-error" : null}`}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control underlined"
            id="email"
            placeholder="Введите ваш email"
            onChange={onChange}
            onBlur={onBlur}
            name="email"
            value={valueEmail}
          />
          {errorEmail ? <span className="form-help-text">{errorEmail}</span> : null}
        </div>
        <div className={`form-group ${errorPassword ? "has-error" : null}`}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control underlined"
            id="password"
            placeholder="Пароль"
            onChange={onChange}
            onBlur={onBlur}
            name="password"
            value={valuePassword}
          />
          {errorPassword ? <span className="form-help-text">{errorPassword}</span> : null}
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={onSubmit}
          >Войти</button>
        </div>
        <div className="form-group">
          <p className="text-muted text-xs-center">
            Нет аккаунта? <NavLink to="/registration">Зарегистрироваться!</NavLink>
          </p>
        </div>
      </form>
    </>
  )
}

const mapStateToProps = state => {
  return {
    valueEmail: state.authReducer.values.email,
    valuePassword: state.authReducer.values.password,
    errorEmail: state.authReducer.errors.email,
    errorPassword: state.authReducer.errors.password,
    userError: state.authReducer.userError,
    nowCanLogin: state.authReducer.nowCanLogin
  }
}

const mapDispatchToProps = {
  updateEmail,
  updatePassword,
  updateErrorEmail,
  updateErrorPassword,
  updateErrors,
  getUserByEmail
}

// const mapDispatchToProps = dispatch => {
//   return {
//     updateEmail: data => dispatch(updateEmail(data))
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Login)