import { FETCH_DATA, SEARCH_WORD } from "./types";

import axios from "axios";

export const fetchData = hastag => {
  return dispatch => {
    axios
      .get(`https://www.instagram.com/explore/tags/${hastag}/`)
      .then(response => {
        dispatch({
          type: FETCH_DATA,
          payload: response.data
        });
      });
  };
};

export const searchWord = word => {
  const searchText = word.replace(' ', '')
  return {
    type: 'SEARCH_WORD',
    payload: searchText
  }
}
