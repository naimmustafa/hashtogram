import {
  FETCH_DATA,
  SEARCH_WORD,
  LOAD_SPINNER,
  KILL_SPINNER,
  PAGES_ALL
} from "./types";

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
  const searchText = word.replace(/\s/g, "");
  const searchTag = searchText.replace(/#/g, "");
  return {
    type: "SEARCH_WORD",
    payload: searchTag
  };
};

export const fetchDatas = arr => {
  const index = arr.indexOf(' #ig');
  arr.splice(index, 1)
  const unique = [...new Set(arr)];
  console.log('hayri', unique)
  return dispatch => {
    const re1 = "(\\s+)"; // White Space 1
    const re2 = "(#)"; // Any Single Character 1
    var p = new RegExp(re1 + re2, ["g"]);
    const promises = unique.map(item =>
      axios.get(
        `https://www.instagram.com/explore/tags/${item.replace(p, "")}/`
      )
    );
    Promise.all(promises).then(values =>
      dispatch({
        type: PAGES_ALL,
        payload: { data: values, tags: arr }
      })
    );
  };
};
