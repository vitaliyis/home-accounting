import React from 'react'
import {withAuthRedirect} from "../../shared/hoc/withAuthRedirect";
import BillCard from "./BillCard/BillCard";
import CurrencyCard from "./CurrencyCard/CurrencyCard";
import {connect} from "react-redux";
import {getBill, getCurrency} from "../../../redux/reducers/bill/bill.actions";

class Bill extends React.Component {

  state = {
    isLoaded: false
  }

   onRefresh = async() => {
     this.setState({
       isLoaded: false
     })
    await this.props.getCurrency()
     this.setState({
       isLoaded: true
     })
  }

  async componentDidMount() {
    await this.props.getBill()
    await this.props.getCurrency()
    this.setState({
      isLoaded: true
    })
  }

  render() {
    const spinner = <div className="row text-center">Loading...</div>

    return(
      <article className="content dashboard-page">
        <div className="title-block">
          <h3 className="title pull-left">
            Страница счета <span className="sparkline bar"></span>
          </h3>
          <div className="pull-right">
            <button
              className="btn-sm btn btn-primary-outline"
              onClick={this.onRefresh}
            >
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>
        <section className="section">
          {!this.state.isLoaded ? spinner :
          <div className="row">
            <BillCard/>
            <CurrencyCard/>
          </div> }
        </section>
      </article>
    )
  }
}

const mapDispatchToProps = {
  getBill,
  getCurrency
}

export default connect(null, mapDispatchToProps)(withAuthRedirect(Bill))