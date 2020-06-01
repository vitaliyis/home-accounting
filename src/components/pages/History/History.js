import React from 'react'
import {withAuthRedirect} from "../../shared/hoc/withAuthRedirect";
import HistoryChart from "./HistoryChart/HistoryChart";
import HistoryEvents from "./HistoryEvents/HistoryEvents";
import HistoryFilter from "./HistoryFilter/HistoryFilter";
import {connect} from "react-redux";
import {getCategories, getEvents} from "../../../redux/reducers/records/records.actions";

class History extends React.Component {

  state = {
    chartData: [],
    isLoaded: false
  }

  calculateChartData() {
    const chartData = []

    this.props.categories.forEach(category => {
      const catEvent = this.props.events.filter(
        event => event.category === category.id && event.type === 'outcome')
      chartData.push({
        name: category.name,
        value: catEvent.reduce((total, event) => {
          total += event.amount
          return total
        }, 0)
      })
    })

    this.setState({
      chartData
    })
    // return chartData
  }

  componentDidMount() {
    Promise.all([
      this.props.getCategories(),
      this.props.getEvents()
    ]).then(() => {
      console.log('categories => ', this.props.categories)
      this.calculateChartData()
      this.setState({
        isLoaded: true
      })
    })
  }

  render() {
    const {chartData, isLoaded} = this.state
    const {categories, events} = this.props
    return(
      <>
        <article className="content">
          <div className="title-block">
            <h3 className="title">
              Страница истории <span className="sparkline bar"></span>
            </h3>
          </div>

          <HistoryChart
            chartData={chartData}
            isLoaded={isLoaded}
          />

          <HistoryEvents
            categories={categories}
            events={events}
          />

          <HistoryFilter/>
        </article>

      </>
    )
  }
}

const mapStateToProps = state => {
  // корректирую дату из "20.05.2020 14:12:39" в "20.05.2020"
  // const newEvents = state.recordsReducer.events.map(event => {
  //   return event.date.split(' ')[0]
  // })

  return{
    categories: state.recordsReducer.categories,
    events: state.recordsReducer.events
  }
}

const mapDispatchToProps = {
  getCategories,
  getEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(History))