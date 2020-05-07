import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Bill extends React.Component {
  render() {
    console.log('this.props.user =>  ', this.props.user)
    if (!this.props.user) {
      return <Redirect to="/login"/>
    }

    return(
      <article className="content dashboard-page">
        <div className="title-block">
          <h3 className="title pull-left">
            Страница счета <span className="sparkline bar"></span>
          </h3>
          <div className="pull-right">
            <button className="btn-sm btn btn-primary-outline">
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>
        <section className="section">
          <div className="row">
            <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-5 stats-col">
              <div className="card stats" style={{height: "291px"}}>
                <div className="card-block">
                  <div className="title-block">
                    <h4 className="title">Счет</h4>
                  </div>
                  <div className="row row-sm stats-container">
                    <div className="col-xs-12 stat-col">
                      <div className="stat-icon"> <i className="fa fa-rub"></i> </div>
                      <div className="stat">
                        <div className="value">80.560</div>
                      </div>
                      <progress className="progress stat-progress" value="100" max="100">
                        <div className="progress">
                          <span className="progress-bar" style={{width: "100%"}}></span>
                        </div>
                      </progress>
                    </div>
                    <div className="col-xs-12 stat-col">
                      <div className="stat-icon"> <i className="fa fa-euro"></i> </div>
                      <div className="stat">
                        <div className="value">80.560</div>
                      </div>
                      <progress className="progress stat-progress" value="100" max="100">
                        <div className="progress">
                          <span className="progress-bar" style={{width: "100%"}}></span>
                        </div>
                      </progress>
                    </div>
                    <div className="col-xs-12 stat-col">
                      <div className="stat-icon"> <i className="fa fa-dollar"></i> </div>
                      <div className="stat">
                        <div className="value">80.560</div>
                      </div>
                      <progress className="progress stat-progress" value="100" max="100">
                        <div className="progress">
                          <span className="progress-bar" style={{width: "100%"}}></span>
                        </div>
                      </progress>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-7 history-col">
              <div className="card">
                <div className="card-block">
                  <div className="title-block">
                    <h4 className="title">Курс</h4>
                  </div>
                  <div className="row row-sm stats-container">
                    <table className="table table-hover">
                      <thead>
                      <tr>
                        <th>Валюта</th>
                        <th>Курс</th>
                        <th>Дата</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>доллар</td>
                        <td>24</td>
                        <td>12.12.2017</td>
                      </tr>
                      <tr>
                        <td>евро</td>
                        <td>26</td>
                        <td>12.12.2017</td>
                      </tr>
                      <tr>
                        <td>рубль</td>
                        <td>0.4</td>
                        <td>12.12.2017</td>
                      </tr>
                      </tbody>
                    </table>
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

export default connect(mapStateToProps)(Bill)