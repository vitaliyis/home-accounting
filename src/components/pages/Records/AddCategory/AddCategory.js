import React from 'react'
import {addCategoryApi} from "../../../../api/api";
import {connect} from "react-redux";
import {getCategories} from "../../../../redux/reducers/records/records.actions";

class AddCategory extends React.Component {

  state = {
    values: {
      name: '',
      capacity: 1
    },
    errors: {
      name: false,
      capacity: false
    },
    message: ''
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
    const {name, capacity} = this.state.values
    const errors = {}

    if (!name) {
      errors.name = 'Название категории не может быть пустым.'
    }

    if (capacity < 0) {
      errors.capacity = "Объем не может быть отрицательным."
    }

    return errors
  }

  onSubmit = event => {
    event.preventDefault()
    const errors = this.getErrors()

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      })
    } else {    // если ошибок нет
      // go to server
      const {name, capacity} = this.state.values
      const newCategory = {
        name,
        capacity: Number(capacity)
      }
      addCategoryApi(newCategory)
        .then(() => {
          this.props.getCategories()

          // вывод сообщения
          this.setState({
            message: 'Категория успешно добавлена.'
          })
          setTimeout(() => {
            this.setState({
              message: ''
            })
          }, 1500)

        })
        .catch(err => console.log(err))

      // сброс формы и ошибок
      this.setState({
        errors: {},
        values: {
          name: '',
          capacity: 1
        }
      })
    }

  }

  render() {
    const {values, errors, message} = this.state

    return (
      <div className="card">
        <div className="card-header bordered">
          <div className="header-block">
            <h3 className="title">Добавить категорию</h3>
          </div>
        </div>
        <div className="card-block">
          {message ? <div className="alert alert-success">{message}</div> : null}
          <form>
            <div className={`form-group ${errors.name ? "has-error" : null}`}>
              <label className="control-label" htmlFor="category-name">Введите название</label>
              <input
                type="text"
                id="category-name"
                className="form-control"
                name="name"
                value={values.name}
                onChange={this.onChange}
              />
              {
                errors.name ?
                <span className="form-help-text">{errors.name}</span>
                : null
              }
            </div>
            <div className={`form-group ${errors.capacity ? "has-error" : null}`}>
              <label className="control-label" htmlFor="category-value">Введите лимит</label>
              <input
                type="number"
                id="category-value"
                className="form-control"
                name="capacity"
                value={values.capacity}
                onChange={this.onChange}
                min="1"
              />
              {
                errors.capacity ?
                  <span className="form-help-text">{errors.capacity}</span>
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

const mapDispatchToProps = {
  getCategories
}

export default connect(null, mapDispatchToProps)(AddCategory)