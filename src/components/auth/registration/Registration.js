import React from 'react'
import {NavLink, Redirect, Switch} from 'react-router-dom'
import {connect} from "react-redux";
import {
  checkEmail,
  createNewUser,
  updateAgree,
  updateEmail, updateErrorAgree,
  updateErrorEmail, updateErrorName, updateErrorPassword, updateErrors, updateName,
  updatePassword
} from "../../../redux/reducers/auth/auth.action";

const Registration = props => {
  const {valueEmail, valuePassword, valueName, valueAgree,
    updateEmail, updatePassword, updateName, updateAgree, updateErrors,
    updateErrorEmail, updateErrorPassword, updateErrorName, updateErrorAgree,
    errorEmail, errorPassword, errorName, errorAgree, createNewUser, nowCanLogin, checkEmail
  } = props

  const onChange = event => {
    // console.log('event.target.value ', event.target.value)
    switch (event.target.name) {
      case 'email':
        updateEmail(event.target.value)
        updateErrorEmail('')
        checkEmail(event.target.value)
        break
      case 'password':
        updatePassword(event.target.value)
        updateErrorPassword('')
        break
      case 'name':
        updateName(event.target.value)
        updateErrorName('')
        break
      case 'agree':
        updateAgree(event.target.checked)
        updateErrorAgree('')
        break
      default: break
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
        case 'name':
          if (errors.name) {
            updateErrorName(errors.name)
          }
          break
        default: break
      }
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

    if (valueName.length < 1) {
      errors.name = "required"
    }

    if (valueAgree === false) {
      errors.agree = "required"
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
      const newUser = {
        email: valueEmail,
        password: valuePassword,
        name: valueName
      }
      createNewUser(newUser)
      // сброс данных values
      updateEmail('')
      updatePassword('')
      updateName('')
      updateAgree(false)
    }
  }

  return(
    <>
      {nowCanLogin ? <Redirect to="/login"/> : null}

      <p className="text-xs-center">Регистрация для получения доступа</p>
      <form>
        <div className={`form-group ${errorEmail ? "has-error" : null}`}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control underlined"
            id="email"
            placeholder="Введите email"
            name="email"
            onChange={onChange}
            onBlur={onBlur}
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
            placeholder="Введите пароль"
            name="password"
            onChange={onChange}
            onBlur={onBlur}
            value={valuePassword}
          />
          {errorPassword ? <span className="form-help-text">{errorPassword}</span> : null}
        </div>
        {/*<div className="form-group has-success">*/}
        <div className={`form-group ${errorName ? "has-error" : null}`}>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            className="form-control underlined"
            id="name"
            placeholder="Введите имя"
            name="name"
            onChange={onChange}
            onBlur={onBlur}
            value={valueName}
          />
          {errorName ? <span className="form-help-text">{errorName}</span> : null}
          <span className="form-help-text">Success message.</span>
        </div>
        <div className={`form-group ${errorAgree ? "has-error" : null}`}>
          <label htmlFor="agree">
            <input
              className="checkbox"
              id="agree"
              type="checkbox"
              name="agree"
              onChange={onChange}
              onBlur={onBlur}
              value={valueAgree}
              checked={valueAgree}
            />
            <span>Согласен с правилами</span>
          </label>
          {errorAgree ? <span className="form-help-text">{errorAgree}</span> : null}
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={onSubmit}
          >Зарегистрироваться</button>
        </div>
        <div className="form-group">
          <p className="text-muted text-xs-center">
            Уже есть аккаунт?
            <NavLink to="/login">
              Войти!
            </NavLink>
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
    valueName: state.authReducer.values.name,
    valueAgree: state.authReducer.values.agree,
    errorEmail: state.authReducer.errors.email,
    errorPassword: state.authReducer.errors.password,
    errorName: state.authReducer.errors.name,
    errorAgree: state.authReducer.errors.agree,
    userError: state.authReducer.userError,
    nowCanLogin: state.authReducer.nowCanLogin
  }
}

const mapDispatchToProps = {
  updateEmail, updatePassword, updateName, updateAgree,updateErrorName, updateErrorAgree,
  updateErrorEmail, updateErrorPassword, updateErrors, createNewUser, checkEmail

}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)