import { GET_SEARCH } from "./types";

import axios from "axios";

export const getSearchData = () => {
  return dispatch => {
    axios
      .get(
        "https://4mf0vxmyn1.execute-api.us-east-2.amazonaws.com/dev/test-api/{type}"
      )
      .then(response => {
        dispatch({
          type: GET_SEARCH,
          payload: response.data.Item.searchTag.L.map(item => item.S)
        });
      })
      .catch(e => alert(e));
  };
};
