import React from 'react'
import {connect} from "react-redux";

class BillCard extends React.Component {
  render () {
    const {bill, eur, dollar} = this.props

    return (
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
                  <div className="value">{bill}</div>
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
                  <div className="value">{eur}</div>
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
                  <div className="value">{dollar}</div>
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
    )
  }
}

const mapStateToProps = state => {
  const bill = state.billReducer.bill.value
  const currency = state.billReducer.currency
  const eur = (bill / currency.rates['UAH']).toFixed(2)
  const dollar = (eur * currency.rates['USD']).toFixed(2)

  return {
    bill, eur, dollar
  }
}

export default connect(mapStateToProps)(BillCard)