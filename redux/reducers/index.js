import {combineReducers} from 'redux'
import {authReducer} from 'root/redux/reducers/loginReducer'

const reducers = combineReducers({
  auth: authReducer,
})

export default reducers
