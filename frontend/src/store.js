import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxPromises from 'redux-promise'

import accountReducer from './reducers/AccoutReducer'
import linkReducer from './reducers/LinkReducer'

const reducers = combineReducers({
  account: accountReducer,
  link: linkReducer
})

const store = createStore(reducers, applyMiddleware(ReduxPromises))

export default store
