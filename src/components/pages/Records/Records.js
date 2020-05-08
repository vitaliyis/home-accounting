import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Records extends React.Component {
  render() {
    if (!this.props.user) {
      return <Redirect to="/login"/>
    }

    return(
      <article className="content">
        <div className="title-block">
          <h3 className="title">
            Страница записей <span className="sparkline bar"></span>
          </h3>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bordered">
                  <div className="header-block">
                    <h3 className="title">Добавить событие</h3>
                  </div>
                </div>
                <div className="card-block">
                  <form>
                    <div className="form-group">
                      <label className="control-label" htmlFor="category">Выберите категорию</label>
                      <select className="form-control" id="category">
                        <option>Option one</option>
                        <option>Option two</option>
                        <option>Option three</option>
                        <option>Option four</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Выберите тип</label>
                      <div>
                        <label>
                          <input className="radio" name="radios" type="radio"/>
                            <span>Доход</span>
                        </label>
                      </div>
                      <div>
                        <label>
                          <input className="radio" name="radios" type="radio" checked/>
                            <span>Расход</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="amount">Введите сумму</label>
                      <input type="number" value="0" id="amount" className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Добавить</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bordered">
                  <div className="header-block">
                    <h3 className="title">Добавить категорию</h3>
                  </div>
                </div>
                <div className="card-block">
                  <form>
                    <div className="form-group has-error">
                      <label className="control-label" htmlFor="category-name">Введите название</label>
                      <input type="text" id="category-name" className="form-control"/>
                        <span className="form-help-text">Валидация ошибка</span>
                    </div>
                    <div className="form-group has-success">
                      <label className="control-label" htmlFor="category-value">Введите лимит</label>
                      <input type="number" value="0" id="category-value" className="form-control"/>
                        <span className="form-help-text">Валидация нет ошибки</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Добавить</button>
                  </form>
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

export default connect(mapStateToProps)(Records)