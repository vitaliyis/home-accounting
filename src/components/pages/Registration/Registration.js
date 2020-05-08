import React from 'react'
import {NavLink, Redirect, withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {checkEmail} from "../../../api/api";
import {createNewUser} from "../../../redux/reducers/auth/auth.actions";


class Registration extends React.Component{
  state = {
    values: {
      email: '',
      password: '',
      name: '',
      agree: false
    },
    errors: {
      email: false,
      password: false,
      name: false,
      agree: false
    }
  }

  onChange = event => {
    const name = event.target.name
    let value = event.target.value

    if (name === 'agree') {
      value = event.target.checked
    }
    this.setState(state => ({
      values: {...state.values, [name] : value},
      errors: {...state.errors, [name] : false}
    }))

    // асинхронная валидация email
    if (name === 'email') {
      checkEmail(event.target.value)
        .then(message => {
          if (message) {
            this.setState(state => ({
              errors: {...state.errors, email: message}
            }))
          }
        })
    }
  }

  getErrors = () => {
    const {values} = this.state
    const errors = {}

    if (!values.email) {
      errors.email = 'required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address"
    }

    if (values.password.length < 6) {
      errors.password = "Must be 6 characters or more"
    }

    if (values.name.length < 1) {
      errors.name = "required"
    }

    if (values.agree === false) {
      errors.agree = "required"
    }

    return errors
  }

  onBlur = event => {
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

  onSubmit = event => {
    event.preventDefault()

    const errors = this.getErrors();

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      })
    } else {    // если ошибок нет
      this.setState({
        errors: {},
      })

      const {values} = this.state
      const newUser = {
        email: values.email,
        password: values.password,
        name: values.name
      }
      this.props.createNewUser(newUser)
        .then(() => {
          this.props.history.push('/login')
        })
    }
  }

  render() {
    const {values, errors} = this.state
    const {isFetching} = this.props

    if (this.props.user) {
      return <Redirect to="/system/bill"/>
    }
    return(
      <>
        <p className="text-xs-center">Регистрация для получения доступа</p>
        <form>
          <div className={`form-group ${errors.email ? "has-error" : null}`}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control underlined"
              id="email"
              placeholder="Введите email"
              name="email"
              onChange={this.onChange}
              onBlur={this.onBlur}
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
              placeholder="Введите пароль"
              name="password"
              onChange={this.onChange}
              onBlur={this.onBlur}
              value={values.password}
            />
            {errors.password ? <span className="form-help-text">{errors.password}</span> : null}
          </div>
          {/*<div className="form-group has-success">*/}
          <div className={`form-group ${errors.name ? "has-error" : null}`}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              className="form-control underlined"
              id="name"
              placeholder="Введите имя"
              name="name"
              onChange={this.onChange}
              onBlur={this.onBlur}
              value={values.name}
            />
            {errors.name ? <span className="form-help-text">{errors.name}</span> : null}
            {/*<span className="form-help-text">Success message.</span>*/}
          </div>
          <div className={`form-group ${errors.agree ? "has-error" : null}`}>
            <label htmlFor="agree">
              <input
                className="checkbox"
                id="agree"
                type="checkbox"
                name="agree"
                onChange={this.onChange}
                value={values.agree}
                checked={values.agree}
              />
              <span>Согласен с правилами</span>
            </label>
            {errors.agree ? <span className="form-help-text">{errors.agree}</span> : null}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block btn-primary"
              onClick={this.onSubmit}
              disabled={isFetching}
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
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    isFetching: state.authReducer.isFetching
  }
}

const mapDispatchToProps = {
  createNewUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration))