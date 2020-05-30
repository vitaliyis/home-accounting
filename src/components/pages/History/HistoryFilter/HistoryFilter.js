import React from 'react'

class HistoryFilter extends React.Component {
  render() {
    return (
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
    )
  }
}

export default HistoryFilter