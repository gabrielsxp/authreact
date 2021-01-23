import { createStore, combineReducers } from 'redux'

import { authReducer } from './reducers/auth'

const reducers = combineReducers({
  authReducer
})

const store = createStore(reducers)

export default store
