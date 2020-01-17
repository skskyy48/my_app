import {combineReducers} from 'redux'
import LeagueReducer from './LeagueReducer'

export default combineReducers({
    league : LeagueReducer
})