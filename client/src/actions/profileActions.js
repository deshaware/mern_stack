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
  axios.get("/api/profile").then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
