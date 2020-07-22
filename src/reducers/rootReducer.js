import { combineReducers } from 'redux';
import fetchCoinsReducer from './fetchCoinsReducer';
import fetchDailyPriceReducer from './fetchDailyPriceReducer';
// import getLocationReducer from './getLocationReducer';

export default combineReducers({
    fetchCoinsReducer,
    fetchDailyPriceReducer,
});