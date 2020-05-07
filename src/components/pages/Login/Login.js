import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {getUserByEmail} from "../../../redux/reducers/auth/auth.actions";

class Login extends React.Component {
  state = {
    values: {
      email: '',
      password: ''
    },
    errors: {
      email: false,
      password: false
    }
  }

  onChange = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState(state => ({
      values: {...state.values, [name] : value},
      errors: {...state.errors, [name] : false}
    }))
  }

  getErrors = () => {
    const {email, password} = this.state.values
    const errors = {}

    if (!email) {
      errors.email = 'required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address"
    }

    if (password.length < 6) {
      errors.password = "Must be 6 characters or more"
    }

    return errors
  }


  onSubmit = async event => {
    event.preventDefault()
    const {getUserByEmail} = this.props
    const errors = this.getErrors();

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      })
    } else {    // если ошибок нет
      this.setState({
        errors: {},
      })
      await getUserByEmail(this.state.values.email, this.state.values.password)
      this.props.history.push('/system/bill')
    }

  }

  onBlur = (event) => {
    const name = event.target.name
    const errors = this.getErrors();

    if (Object.keys(errors).length > 0) {
      if (errors[name]) {
        this.setState(state => ({
          errors: {...state.errors, [name]: errors[name]}
        }))
      }
    } else {    // если ошибок нет
      this.setState({
        errors: {},
      })
    }
  }

  render() {
    const {values, errors} = this.state
    const {userError, nowCanLogin, isFetching} = this.props
    return(
      <>
        <p className="text-xs-center">Войдите для работы</p>
        {userError ? <div className="alert alert-danger">{userError}</div> : null}
        {nowCanLogin ? <div className="alert alert-success">{nowCanLogin}</div> : null}
        <form>
          <div className={`form-group ${errors.email ? "has-error" : null}`}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control underlined"
              id="email"
              placeholder="Введите ваш email"
              onChange={this.onChange}
              onBlur={this.onBlur}
              name="email"
              value={values.email}
            />
            {errors.email ? <span className="form-help-text">{errors.email}</span> : null}
          </div>
          <div className={`form-group ${errors.password ? "has-error" : null}`}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control underlined"
              id="password"
              placeholder="Пароль"
              onChange={this.onChange}
              onBlur={this.onBlur}
              name="password"
              value={values.password}
            />
            {errors.password ? <span className="form-help-text">{errors.password}</span> : null}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block btn-primary"
              onClick={this.onSubmit}
              disabled={isFetching}
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

}

const mapStateToProps = state => {
  return {
    userError: state.authReducer.userError,
    nowCanLogin: state.authReducer.nowCanLogin,
    isFetching: state.authReducer.isFetching
  }
}

const mapDispatchToProps = {
  getUserByEmail,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))