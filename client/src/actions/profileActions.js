import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  //PROFILE_NOT_FOUND,
  GET_ERRORS
} from "./types";

//Get current profile.
export const getCurrentProfile = () => dispatch => {
  //set the loading state
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//create profile
export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile',profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
        dispatch({
          type:GET_ERRORS,
          payload: err.response.data
        })
      )
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
