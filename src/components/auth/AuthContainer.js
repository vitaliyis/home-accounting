import React from 'react'

const AuthContainer = props => {
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="card">
          <header className="auth-header">
            <h1 className="auth-title">
              <div className="logo">
                <span className="l l1"></span>
                <span className="l l2"></span>
                <span className="l l3"></span>
                <span className="l l4"></span>
                <span className="l l5"></span>
              </div>
              Домашняя бухгалтерия
            </h1>
          </header>
          <div className="auth-content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer