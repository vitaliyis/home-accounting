import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class History extends React.Component {
  render() {
    if (!this.props.user) {
      return <Redirect to="/login"/>
    }

    return(
      <>
        <article className="content">
          <div className="title-block">
            <h3 className="title">
              Страница истории <span className="sparkline bar"></span>
            </h3>
          </div>
          <section className="section">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-block">
                    <section className="example" style={{textAlign: "center"}}>
                      {/*<div id="morris-donut-chart"><svg height="355" version="1.1" width="545" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative; left: -0.8px; top: -0.6px;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël @@VERSION</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><path fill="none" stroke="#85d2ed" d="M272.5,295A114,114,0,0,0,380.11155310728583,218.6265018017594" stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></path><path fill="#85d2ed" stroke="#ffffff" d="M272.5,298A117,117,0,0,0,382.94343608379336,219.6166729018057L429.19752470008285,235.78946753589526A166,166,0,0,1,272.5,347Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#2db2df" d="M380.11155310728583,218.6265018017594A114,114,0,0,0,170.23213383321087,130.62854429647973" stroke-width="2" opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;"></path><path fill="#2db2df" stroke="#ffffff" d="M382.94343608379336,219.6166729018057A117,117,0,0,0,167.54087419724272,129.3029796727029L119.09820074981627,105.44281644471961A171,171,0,0,1,433.9173296609287,237.4397527026391Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#59c2e6" d="M170.23213383321087,130.62854429647973A114,114,0,0,0,272.4641858443382,294.9999943743255" stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></path><path fill="#59c2e6" stroke="#ffffff" d="M167.54087419724272,129.3029796727029A117,117,0,0,0,272.46324336655766,297.9999942262815L272.44784956280824,346.9999918082284A166,166,0,0,1,123.58363347642984,107.65209081768101Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="272.5" y="171" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="15px" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 15px; font-weight: 800;" font-weight="800" transform="matrix(1.774,0,0,1.774,-211.0738,-140.7078)" stroke-width="0.5637030945419103"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="6">In-Store Sales</tspan></text><text x="272.5" y="191" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="14px" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 14px;" transform="matrix(2.375,0,0,2.375,-374.8164,-251.625)" stroke-width="0.42105263157894735"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4.796875">30</tspan></text></svg></div>*/}
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                      <tr>
                        <th scope="row">1</th>
                        <td>44 444</td>
                        <td>12.12.2017</td>
                        <td>Товары</td>
                        <td>
                          <span className="label label-danger">Расход</span>
                        </td>
                        <td className="text-lg-center">
                          <a href="#" className="btn btn-primary-outline">Открыть</a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>33 333</td>
                        <td>12.12.2017</td>
                        <td>Отдых</td>
                        <td>
                          <span className="label label-success">Доход</span>
                        </td>
                        <td className="text-lg-center">
                          <a href="#" className="btn btn-primary-outline">Открыть</a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
        {/*// <!--MODAL-->*/}
        <div className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close">
                  <span>×</span>
                </button>
                <h4 className="modal-title">Фильтр</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="control-label" htmlFor="period">Выберите период</label>
                  <select className="form-control" id="period">
                    <option>тип</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="control-label">Выберите тип события</label>
                  <div>
                    <label>
                      <input
                        className="checkbox"
                        type="checkbox"
                      />
                        <span>еуче</span>
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Выберите категории</label>
                  <div>
                    <label>
                      <input
                        className="checkbox"
                        type="checkbox"
                      />
                        <span>еуче</span>
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary">Отмена</button>
                  <button type="button" className="btn btn-primary">Применить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*// <!--MODAL-->*/}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps)(History)