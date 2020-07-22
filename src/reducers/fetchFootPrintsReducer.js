
import { FETCH_FOOTPRINT_SUCCESS } from '../actions/types';

const initialState = {
    footPrints: [],
    isLoading: true
};

function fetchFootPrintsReducer(state = initialState, action = {}) {
 switch (action.type) {
   case FETCH_FOOTPRINT_SUCCESS:
     return {
       ...state,
       footPrints: action.payload,
       isLoading: false
     };
   default:
     return state;
 }
}

export default fetchFootPrintsReducer;