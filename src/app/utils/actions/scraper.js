import { FETCH_DATA, SEARCH_WORD, LOAD_SPINNER, KILL_SPINNER } from "./types";

import axios from "axios";

export const loginSpinner = () => {
  return {
    type: "LOAD_SPINNER",
    payload: true
  };
};

export const killSpinner = () => {
  return {
    type: "KILL_SPINNER",
    payload: false
  };
};

export const fetchData = hastag => {
  return dispatch => {
    dispatch(loginSpinner());
    axios
      .get(`https://www.instagram.com/explore/tags/${hastag}/`)
      .then(response => {
        dispatch({
          type: FETCH_DATA,
          payload: response.data
        });
      })
      .catch(e => {
        alert("This page does not exist");
        dispatch(killSpinner());
      });
  };
};

export const searchWord = word => {
  const searchText = word.replace(/\s/g,'');
  const searchTag = searchText.replace(/#/g, '')
  return {
    type: "SEARCH_WORD",
    payload: searchTag
  };
};
