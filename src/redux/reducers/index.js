import LandingReducer from './../../actions/reducers';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  LandingReducer: LandingReducer,
});
export default rootReducer;
