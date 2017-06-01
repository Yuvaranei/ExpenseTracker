import React from 'react'
import ReactHighcharts from 'react-highcharts'
import Highcharts from 'highcharts'
import {connect} from 'react-redux'

class ReactChart extends React.Component {
    constructor(props) {
        super(props)

        //let expenses = JSON.parse(localStorage.getItem("expenses"))
        let expenses = this.props.expenseData
        let reportMap = new Map()
        expenses.map(function (item) {
            if (!reportMap.has(item.category)) {
                reportMap.set(item.category, Number(item.amount))
            }
            else {
                let total = Number(item.amount) + Number(reportMap.get(item.category))
                reportMap.set(item.category, total)
            }

        })
        let seriesObj = []
        for (var [key, value] of reportMap) {
            seriesObj.push({
                name: key,
                y: value
            })
        }

        var chartConfig = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Expense Report'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Amount ₹'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>₹{point.y}</b>'
            },
            series: [{
                name: 'Categories',
                colorByPoint: true,
                data: seriesObj
            }]
        }
        this.state = { config: chartConfig };
    }

    render() {
        return (
            <ReactHighcharts config={this.state.config} ref="chart"></ReactHighcharts>
        )
    }
}

export default connect(state => (
    {
        expenseData : state.expensetrackerReducer.expenseData
    }
))