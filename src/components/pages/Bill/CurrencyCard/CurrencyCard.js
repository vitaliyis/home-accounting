import React from 'react'
import {connect} from "react-redux";

class CurrencyCard extends React.Component {
  render () {
    const {eur, dollar, date} = this.props
    return (
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
                  <td>{dollar}</td>
                  <td>{date}</td>
                </tr>
                <tr>
                  <td>евро</td>
                  <td>{eur}</td>
                  <td>{date}</td>
                </tr>
                <tr>
                  <td>гривна</td>
                  <td>1</td>
                  <td>{date}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const currency = state.billReducer.currency
  const eur = currency.rates['UAH'].toFixed(2)
  const dollar = (eur / currency.rates['USD']).toFixed(2)

  const date = state.billReducer.currency.date

  return {
    eur, dollar, date
  }
}

export default connect(mapStateToProps)(CurrencyCard)