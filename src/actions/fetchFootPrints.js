import axios from 'axios';
import {
    FETCH_FOOTPRINT_ERROR,
    FETCH_FOOTPRINT_SUCCESS,
    IS_LOADING
} from './types';

export const fetchFootprintsSuccess = (payload) => ({
     type: FETCH_FOOTPRINT_SUCCESS,
     payload
   });

   export const fetchFootprintsFailure = payload => ({
    type: FETCH_FOOTPRINT_ERROR,
    payload
  });

   export const Loading = () => ({
    type: IS_LOADING
  });

export const fetchFootprintsAction = () => (dispatch) => {
    dispatch(Loading());
    axios.get(`https://bantu-api.herokuapp.com/footprints/list`
      ).then((response) => {
        dispatch(fetchFootprintsSuccess(response.data));
      }).catch((error) => {
        console.log(error);
        dispatch(fetchFootprintsFailure(error.response));
      });
};
