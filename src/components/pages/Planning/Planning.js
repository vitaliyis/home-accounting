import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Planning extends React.Component {
  render() {
    if (!this.props.user) {
      return <Redirect to="/login"/>
    }

    return(
      <article className="content">
        <div className="title-block">
          <h3 className="title">
            Страница планирования <span className="sparkline bar"></span>
          </h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-sm bordered">
                  <div className="header-block">
                    <h3 className="title">Расходы</h3>
                  </div>
                  <h5 className="planning-expenses pull-right">
                    Общий остаток: <span className="text-success">78 999.21 Р</span>
                  </h5>
                </div>
                <div className="card-block">
                  <div className="row">
                    <div className="col-xs-6">
                      <div className="n-progress">
                        <div className="progress-bar success" style={{width: "30%"}}>
                          <span>Название категории</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <p>
                        <span className="text-success">300.00</span>
                        из
                        <span className="text-primary">1000.00</span>
                        |
                        осталось <span className="text-success">700.00</span> (руб.)
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <div className="n-progress">
                        <div className="progress-bar warning" style={{width: "60%"}}>
                          <span>Название категории</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <p>
                        <span className="text-warning">600.00</span>
                        из
                        <span className="text-primary">1000.00</span>
                        |
                        осталось <span className="text-success">400.00</span> (руб.)
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <div className="n-progress">
                        <div className="progress-bar danger" style={{width: "100%"}}>
                          <span>Название категории</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <p>
                        <span className="text-danger">1200.00</span>
                        из
                        <span className="text-primary">1000.00</span>
                        |
                        осталось <span className="text-danger">-200.00</span> (руб.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps)(Planning)