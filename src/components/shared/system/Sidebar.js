import React from 'react'
import {Link, withRouter} from "react-router-dom";

class Sidebar extends React.Component {
  render() {
    const {location} = this.props
    return(
      <aside className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <div className="brand">
              <div className="logo">
                <span className="l l1"></span>
                <span className="l l2"></span>
                <span className="l l3"></span>
                <span className="l l4"></span>
                <span className="l l5"></span>
              </div>
              Бухгалтерия
            </div>
          </div>
          <nav className="menu">
            <ul className="nav metismenu">
              <li className={location.pathname === '/system/bill' ? 'active' : ''}>
                <Link to="/system/bill"> <i className="fa fa-building-o"></i>Счет</Link>
              </li>
              <li className={location.pathname === '/system/history' ? 'active' : ''}>
                <Link to="/system/history"> <i className="fa fa-flash"></i>История</Link>
              </li>
              <li className={location.pathname === '/system/planning' ? 'active' : ''}>
                <Link to="/system/planning"> <i className="fa fa-archive"></i>Планирование</Link>
              </li>
              <li className={location.pathname === '/system/records' ? 'active' : ''}>
                <Link to="/system/records"> <i className="fa fa-plus-square"></i>Запись</Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}

export default withRouter(Sidebar)