import React from 'react'

import {PieChart, Pie, Cell, Tooltip} from 'recharts'

class HistoryChart extends React.Component {

  render() {
    const {isLoaded, chartData} = this.props
    const spinner = <section className="section text-center">Loading...</section>

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
      <div className="card">
        <div className="card-block" style={{height: '355px'}}>
        {!isLoaded ? spinner :
        <section className="section">
          <div className="row">
            <div className="col-xs-12 text-center">
              <PieChart width={545} height={355} onMouseEnter={this.onPieEnter}>
                <Pie
                  data={chartData}
                  // cx={120}
                  // cy={200}
                  innerRadius={60}
                  // outerRadius={80}
                  fill="#2DB2DF"
                  // paddingAngle={5}
                  dataKey="value"
                  // nameKey="name"
                  label
                >
                  {
                    chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </section>
        }
        </div>
      </div>
    )
  }
}

export default HistoryChart