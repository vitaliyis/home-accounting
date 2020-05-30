import React from 'react'
import {withAuthRedirect} from "../../shared/hoc/withAuthRedirect";
import AddEvent from "./AddEvent/AddEvent";
import AddCategory from "./AddCategory/AddCategory";
import EditCategory from "./EditCategory/EditCategory";
import {getCategories} from "../../../redux/reducers/records/records.actions";
import {connect} from "react-redux";

class Records extends React.Component {

  getOptionsItems = items => {
    return items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
  }

  componentDidMount() {
    this.props.getCategories()
  }
  render() {
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
              <AddEvent
                getOptionsItems={this.getOptionsItems}
              />
            </div>
            <div className="col-md-6">
              <AddCategory/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <EditCategory
                getOptionsItems={this.getOptionsItems}
              />
            </div>
          </div>
        </section>
      </article>
    )
  }
}

const mapDispatchToProps = {
  getCategories
}

export default connect(null, mapDispatchToProps)(withAuthRedirect(Records))