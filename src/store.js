import { createStore, combineReducers } from 'redux'
import reducers from './reducers/expensetrackerReducer'
import {routerReducer} from 'react-router-redux'


export const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer
  })
)