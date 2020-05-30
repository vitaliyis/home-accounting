import React from 'react'
import {withAuthRedirect} from "../../shared/hoc/withAuthRedirect";
import {connect} from "react-redux";
import {getCategories, getEvents} from "../../../redux/reducers/records/records.actions";
import {getBill} from "../../../redux/reducers/bill/bill.actions";

class Planning extends React.Component {

  state = {
    isLoaded: false
  }

  getCategoryCost(category) {
    const catEvents = this.props.events.filter(e => e.category === category.id && e.type === 'outcome')
    return catEvents.reduce((total, e) => {
      total += e.amount
      return total
    }, 0)
  }

  getPercent(category) {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity
    return percent > 100 ? 100 : percent
  }

  getCatPercent(category) {
    return this.getPercent(category) + '%'
  }

  getCatColorClass(category) {
    const percent = this.getPercent(category)
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning'
  }

  componentDidMount() {
    Promise.all([
      this.props.getBill(),
      this.props.getCategories(),
      this.props.getEvents()
    ]).then(() => {
      this.setState({
        isLoaded: true
      })
    })
  }

  render() {
    const {bill, categories, events} = this.props
    const {isLoaded} = this.state
    const spinner = <section className="section text-center">Loading...</section>
    return(
      <article className="content">
        <div className="title-block">
          <h3 className="title">
            Страница планирования <span className="sparkline bar"></span>
          </h3>
        </div>
        {!isLoaded ? spinner :
          <section className="section">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-sm bordered">
                    <div className="header-block">
                      <h3 className="title">Расходы</h3>
                    </div>
                    <h5 className="planning-expenses pull-right">
                      Общий остаток: <span className="text-success">{bill.value} Грн.</span>
                    </h5>
                  </div>
                  <div className="card-block">
                    {categories.length ? categories.map(c => {
                      return (<div className="row" key={Math.random()}>
                        <div className="col-xs-6">
                          <div className="n-progress">
                            <div className={`progress-bar ${this.getCatColorClass(c)}`} style={{width: this.getCatPercent(c)}}>
                              <span>{c.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <p>
                            <span className={`text-${this.getCatColorClass(c)}`}>{this.getCategoryCost(c)}</span>
                            из
                            <span className="text-primary">{c.capacity}</span>
                            |
                            осталось <span className={`text-${this.getCatColorClass(c)}`}>{c.capacity - this.getCategoryCost(c)}</span> (руб.)
                          </p>
                        </div>
                      </div>)
                    }) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      </article>
    )
  }
}

const mapStateToProps = state => {
  return {
    bill: state.billReducer.bill,
    categories: state.recordsReducer.categories,
    events: state.recordsReducer.events
  }
}

const mapDispatchToProps = {
  getBill,
  getCategories,
  getEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Planning))