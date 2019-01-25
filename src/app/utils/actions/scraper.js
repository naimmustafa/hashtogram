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
      }).catch(e => alert('Thats a no no word'))
  };
};

export const searchWord = word => {
  const searchText = word.replace(' ', '')
  return {
    type: 'SEARCH_WORD',
    payload: searchText
  }
}

export const addFetch = () => {
  return dispatch => {
    axios.get("//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=f6d8a7c9-0267-4d21-86a3-ec7804800d08")
    .then(response => console.log(response))
  }
}
