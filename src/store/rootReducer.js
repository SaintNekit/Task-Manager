import { createBrowserHistory } from 'history'
import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import reducers from 'reducers'

const history = createBrowserHistory()

const reducer = combineReducers({
  router: connectRouter(history),
  reducers,
})

export { history }

export default reducer
