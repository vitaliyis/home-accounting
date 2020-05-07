import React from 'react'
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../../redux/reducers/auth/auth.actions";

class Header extends React.Component {

  state = {
    isOpenDropdown: false
  }

  toggleDropdown = () => {
    this.setState(state => ({
      isOpenDropdown: !state.isOpenDropdown
    }))
  }

  onLogout = () => {
    this.props.logout()
    this.props.history.push('/login')
  }

  render() {
    const date = new Date().toLocaleDateString()
    const {isOpenDropdown} = this.state
    const {user} = this.props

    return (
      <header className="header">
        <div className="header-block header-block-search">
          {date}
        </div>
        <div className="header-block header-block-nav">
          <ul className="nav-profile">
            <li className={`profile dropdown ${isOpenDropdown ? "open" : null}`}>
              <a className="nav-link dropdown-toggle"
                 // href="#"
                 role="button"
                 onClick={this.toggleDropdown}
              >
                <span className="name">
                    Здравствуйте, {user ? user[0].name : 'нет пользователя'}
                </span>
              </a>
              <div className="dropdown-menu profile-dropdown-menu">
                <Link className="dropdown-item"
                      to="/system/records"
                      onClick={this.toggleDropdown}
                >
                  <i className="fa fa-gear icon"></i>
                  Сделать запись
                </Link>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item"
                   onClick={this.onLogout}
                >
                  <i className="fa fa-power-off icon"></i>
                  Выйти
                </a>
              </div>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = {
  logout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))