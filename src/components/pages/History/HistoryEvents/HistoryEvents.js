import React from 'react'
import {NavLink} from "react-router-dom";

class HistoryEvents extends React.Component {
  render() {
    const {categories, events} = this.props
    console.log('events => ', events)

    const newEvents = [...events]
    if (newEvents.length) {newEvents.forEach(e => {
      e.catName = categories.find(c => c.id === e.category).name
    })}

    console.log('newEvents => ', newEvents)
    return (
      <section className="section">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bordered">
                <div className="header-block">
                  <h3 className="title">Список событий</h3>
                </div>
                <div className="form-inline pull-right m-r-2">
                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="Поиск..."/>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn btn-secondary dropdown-toggle ">
                      Параметр
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-block">
                <table className="table table-striped">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Сумма</th>
                    <th>Дата</th>
                    <th>Категория</th>
                    <th>Тип</th>
                    <th className="text-lg-center">Действие</th>
                  </tr>
                  </thead>
                  <tbody>
                  {newEvents.length ? newEvents.map((e, index) => {
                    return (
                      <tr key={Math.random()}>
                        <th scope="row">{index + 1}</th>
                        <td>{e.amount}</td>
                        <td>{e.date.split(' ')[0]}</td>
                        <td>{e.catName}</td>
                        <td>
                          <span className={`label label-${e.type === 'income' ? "success" : "danger"}`}>
                            {e.type === 'income' ? "Доход" : "Расход"}</span>
                        </td>
                        <td className="text-lg-center">
                          <NavLink to={`/system/history/${e.id}`} className="btn btn-primary-outline">Открыть</NavLink>
                        </td>
                      </tr>
                    )
                  }) : null}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default HistoryEvents