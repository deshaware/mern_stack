import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//1,type is the most important, it needs when we dispatch
//2, Here we are gonna be working with asynchronous calls like server, return error etc,
//we will need a middleware for the mean time i.e. thunk middleware
//we will have to add dispatch

//Register User
export const registerUser = (userData, history) => dispatch => {
  // return {
  //   type: TEST_DISPATCH,
  //   payload: userData
  // };
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      //since we are gonna wait for response, will add thunk as in dispatch new action
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to local storage(Token)
      const { token } = res.data;
      //Set token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data ->decoded will have, issued at date and expiration details
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set Login User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  //Remove the token from local storage
  localStorage.removeItem("jwtToken");
  // remove auth header for future request
  setAuthToken(false);
  //Set current user to an empty object , which will also setAuthenticated to false
  dispatch(setCurrentUser({})); //decoded is null, means payload is gonna be empty object in reducer
};
