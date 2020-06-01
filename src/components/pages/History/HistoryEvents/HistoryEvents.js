import React from 'react'
import {NavLink} from "react-router-dom";

class HistoryEvents extends React.Component {

  state = {
    isOpenDropdown: false,
    search: {
      value: '',
      placeholder: 'Сумма',
      field: 'amount'
    }
  }

  toggleDropdown = () => {
    this.setState(state => ({
      isOpenDropdown: !state.isOpenDropdown
    }))
  }

  onChange = event => {
    const value = event.target.value

    this.setState(state => ({
      search: {...state.search, value}
    }))
  }

  changeCriteria = field => {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    }

    this.setState(state => ({
      search: {
        ...state.search,
        placeholder: namesMap[field],
        field: field
      },
      isOpenDropdown: false
    }))
  }

  transform = (items, value, field) => {
    if (items.length === 0 || !value) {
      return items
    }

    return items.filter(item => {
      const t = Object.assign({}, item)
      if (!isNaN(t[field])) {
        t[field] += ''
      }

      if (field === 'type') {
        t[field] = t[field] === 'income' ? 'доход' : 'расход'
      }

      if (field === 'category') {
        t[field] = t['catName']
      }

      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1
    })

  }

  render() {
    const { isOpenDropdown, search } = this.state
    const { categories, events } = this.props

    let newEvents = [...events]
    if (newEvents.length) {
      newEvents.forEach(e => {
      e.catName = categories.find(c => c.id === e.category).name
      e.date = e.date.split(' ')[0]
    })
      newEvents = this.transform(newEvents, search.value, search.field)
    }

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
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder={search.placeholder}
                      value={search.value}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className={`btn-group ${isOpenDropdown ? "open" : null}`}>
                    <button
                      type="button"
                      className="btn btn-secondary dropdown-toggle"
                      onClick={this.toggleDropdown}
                    >
                      Параметр
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" onClick={() => this.changeCriteria('amount')}>Сумма</a>
                      <a className="dropdown-item" onClick={() => this.changeCriteria('date')}>Дата</a>
                      <a className="dropdown-item" onClick={() => this.changeCriteria('category')}>Категория</a>
                      <a className="dropdown-item" onClick={() => this.changeCriteria('type')}>Тип</a>
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
                        <td>{e.date}</td>
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