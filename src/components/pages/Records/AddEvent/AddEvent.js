import React from 'react'
import {connect} from "react-redux";
import moment from "moment";
import {updateBillInServer} from "../../../../redux/reducers/bill/bill.actions";
import {addEventApi, getBillApi} from "../../../../api/api";

class AddEvent extends React.Component {

  state = {
    values: {
      amount: 0,
      category: 1,
      description: '',
      type: "outcome"
    },
    errors: {
      amount: false,
      description: false
    },
    errorMessage: '',
    successMessage: ''
  }

  onChange = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState(state => ({
      values: {...state.values, [name] : value},
      errors: {...state.errors, [name] : false}
    }))
  }

  getErrors = () => {
    const {amount, description} = this.state.values
    const errors = {}

    if (!description) {
      errors.description = 'Описание события не может быть пустым.'
    }

    if (amount <= 0) {
      errors.amount = "Сумма не может быть отрицательной."
    }

    return errors
  }

  onSubmit = event => {
    event.preventDefault()
    const errors = this.getErrors()

    // проверяем есть ли ошибки
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      })
    } else {  // если нет ошибок формируем новое событие и отправляем на сервер
      console.log('You can go to server! )))')

        const {amount, category, description, type} = this.state.values
      // формируем новое событие
      const newEvent = {
        type,
        amount: +amount,
        category: +category,
        date: moment().format('DD.MM.YYYY HH:mm:ss'),
        description
      }

      // перед отправкой события проверяем счет, получив его от сервера
      getBillApi()
        .then(bill => {
            let value = 0
            if (type === 'outcome') {
              if (amount > bill.value) {
                // ошибка
                const str = `На счету не достаточно средств. Вам не хватает ${amount - bill.value}`
                this.setState({
                    errorMessage: str
                })
                setTimeout(() => {
                  this.setState({
                      errorMessage: ''
                  })
                }, 3000)
                return
              } else {
                  value = bill.value - Number(amount)
              }
            } else {
                value = bill.value + Number(amount)
            }

            // Если на счету есть бабки изменяем счет и заносим событие на серваке
            this.props.updateBillInServer({value, currency: bill.currency})
              .then(() => {
                  addEventApi(newEvent)
                    .then(() => {
                      const str = 'Событие успешно добавлено'
                      this.setState({
                          successMessage: str
                      })
                      setTimeout(() => {
                          this.setState({
                              successMessage: ''
                          })
                      }, 3000)

                      // сброс формы
                      this.setState({
                        values: {
                            amount: 0,
                            category: 1,
                            description: '',
                            type: "outcome"
                        }
                      })
                    })
              })
              .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

    }

  }

  render() {
    const {values, errors, errorMessage, successMessage} = this.state
    const {getOptionsItems, categories} = this.props
    return (
      <div className="card">
        <div className="card-header bordered">
          <div className="header-block">
            <h3 className="title">Добавить событие</h3>
          </div>
        </div>
        <div className="card-block">
          {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}
          {successMessage ? <div className="alert alert-success">{successMessage}</div> : null}
          <form>
            <div className="form-group">
              <label className="control-label" htmlFor="category">Выберите категорию</label>
              <select
                className="form-control"
                id="category"
                name="category"
                value={values.category}
                onChange={this.onChange}
              >
                {categories.length ? getOptionsItems(categories) : <option>Категорий нет</option>}
              </select>
            </div>
            <div className="form-group">
              <label className="control-label">Выберите тип</label>
              <div>
                <label>
                  <input className="radio"
                         name="type"
                         type="radio"
                         value="income"
                         checked={values.type === "income"}
                         onChange={this.onChange}
                  />
                  <span>Доход</span>
                </label>
              </div>
              <div>
                <label>
                  <input className="radio"
                         name="type"
                         type="radio"
                         value="outcome"
                         checked={values.type === "outcome"}
                         onChange={this.onChange}
                  />
                  <span>Расход</span>
                </label>
              </div>
            </div>
            <div className={`form-group ${errors.amount ? "has-error" : null}`}>
              <label className="control-label" htmlFor="amount">Введите сумму</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                name="amount"
                value={values.amount}
                onChange={this.onChange}
              />
              {
                errors.amount ?
                  <span className="form-help-text">{errors.amount}</span>
                  : null
              }
            </div>
            <div className={`form-group ${errors.description ? "has-error" : null}`}>
              <label className="control-label" htmlFor="description">Введите описание</label>
              <input
                type="text"
                id="description"
                className="form-control"
                name="description"
                value={values.description}
                onChange={this.onChange}
              />
              {
                errors.description ?
                  <span className="form-help-text">{errors.description}</span>
                  : null
              }
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmit}
            >Добавить</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    categories: state.recordsReducer.categories,
  }
}

const mapDispatchToProps = {
  updateBillInServer
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent)