import axios from "axios";
//The reason using axios over fetch is so that we can set headers, (aur backend needs header which is authentication) else will have to manually check headers

const setAuthToken = token => {
  if (token) {
    //Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
