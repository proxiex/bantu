import { combineReducers } from 'redux';
import fetchCoinsReducer from './fetchCoinsReducer';
import fetchDailyPriceReducer from './fetchDailyPriceReducer';
import fetchFootPrintsReducer from './fetchFootPrintsReducer';

export default combineReducers({
    fetchCoinsReducer,
    fetchDailyPriceReducer,
    fetchFootPrintsReducer,
});
