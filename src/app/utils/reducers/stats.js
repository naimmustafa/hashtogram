import {
  GET_SEARCH
} from "../actions/types";

const INIT_STATE = {
  hashtagsData: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SEARCH:
      return { ...state, hashtagsData: action.payload };
    default:
      return state;
  }
};
