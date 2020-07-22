import { COINS_UPDATE } from '../actions/types';

   const initialState = {
    coins: [],
    isLoading: true
  };
  
  function updateCoinsDataReducer(state = initialState, action = {}) {
    switch (action.type) {
      case COINS_UPDATE:
        // newState = state.recipes.filter(recipe => `${recipe.id}` !== `${action.id}`);
          // console.log('>>> Reducer...', action.payload)
        const coinId = state.coins.findIndex(x => x.id === action.payload.base)
        // console.log('>>', state.coins)
        return {
          ...state
        };
      default:
        return state;
    }
  }
  
  export default updateCoinsDataReducer;