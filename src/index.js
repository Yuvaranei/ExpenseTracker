import React from 'react';
import ReactDOM from 'react-dom';
import Category from './view/category'
import Expenses from './view/expenses';
import Report from './view/report';
import Home from './view/home';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.scss'
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Constants from './common/constants'
import {Provider} from 'react-redux'
import {store} from './store'
import {setCategoryData} from './action-creators/expensetrackerActions'
import { syncHistoryWithStore} from 'react-router-redux'
const history = syncHistoryWithStore(hashHistory, store)

class Index extends React.Component {

  constructor() {
    super()
    // localStorage.setItem("categories", JSON.stringify(Constants.DEFAULT_CATEGORY))
    // localStorage.setItem("expenses", JSON.stringify([]))
  }

  componentWillMount(){
    setCategoryData(Constants.DEFAULT_CATEGORY)
  }

  render() {

    let topNavigation = <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <a className="brandName" href="#/home">Expense Tracker</a>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <a className="navItem" href="#/category">Category</a>
          <a className="navItem" href="#/expense">Expense</a>
          <a className="navItem" href="#/report">Report</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    return (
      <div>
        {topNavigation}
        {this.props.children}

      </div>
    )
  }
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Index}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="category" component={Category} />
        <Route path="expense" component={Expenses} />
        <Route path="report" component={Report} />
      </Route>
    </Router>
  </Provider>, document.getElementById("container")
);




