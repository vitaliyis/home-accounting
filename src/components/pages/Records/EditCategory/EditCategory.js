import React from 'react'
import {updateCategoryApi} from "../../../../api/api";
import {connect} from "react-redux";
import {getCategories} from "../../../../redux/reducers/records/records.actions";

class EditCategory extends React.PureComponent {

  state = {
    values: {
      name: '',
      capacity: 1,
      category: 1,
    },
    errors: {
      name: false,
      capacity: false
    },
    message: ''
  }

  onChange = event => {
    let name = event.target.name
    let value = event.target.value

    this.setState(state => ({
      values: {...state.values, [name] : value},
      errors: {...state.errors, [name] : false}
    }))

    if (name === 'category') {
      this.setState((state, props) => {
        const category = props.categories.find(c => c.id === +state.values.category)
        return {
        values: {...state.values, name : category.name, capacity: category.capacity}
      }})
    }
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
      console.log('submit')
      const {name, capacity, category} = this.state.values
      const newCategory = {
        name,
        capacity,
        id: category
      }

      updateCategoryApi(newCategory)
        .then(() => {
          this.props.getCategories()
          this.setState({message: 'Категория успешно отредактирована.'})
          setTimeout(() => {
            this.setState({message: ''})
          }, 3000)
        })
        .catch(err => console.log(err))

      // сброс формы и ошибок
      this.setState({
        errors: {},
        // values: {
        //   name: undefined,
        //   capacity: 1,
        //   category: +newCategory.id
        // }
      })
    }
  }

  componentDidUpdate(){
    if (this.state.values.name === '') {
      this.setState((state, props) => {
        const category = props.categories.find(c => c.id === +state.values.category)
        return {
          values: {...state.values, name : category.name, capacity: category.capacity}
        }})
    }
  }

  render() {
    const {values, errors, message} = this.state
    const {categories, getOptionsItems} = this.props
    return (
      <div className="card">
        <div className="card-header bordered">
          <div className="header-block">
            <h3 className="title">Редактировать категорию</h3>
          </div>
        </div>
        <div className="card-block">
          {message
            ? <div className="alert alert-success">{message}</div>
            : null
          }
          <form>
            <div className="form-group">
              <label className="control-label" htmlFor="e-select-category">Выберите категорию</label>
              <select
                className="form-control"
                id="e-select-category"
                name="category"
                value={values.category}
                onChange={this.onChange}
              >
                {categories.length ? getOptionsItems(categories) : <option>Категорий нет</option>}
              </select>
            </div>
            <div className={`form-group ${errors.name ? "has-error" : null}`}>
              <label className="control-label" htmlFor="e-category-name">Введите название</label>
              <input
                type="text"
                id="e-category-name"
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
              <label className="control-label" htmlFor="e-category-value">Введите лимит</label>
              <input
                type="number"
                id="e-category-value"
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
            >Редактировать</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.recordsReducer.categories
  }
}

const mapDispatchToProps = {
  getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory)