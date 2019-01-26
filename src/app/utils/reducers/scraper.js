import { FETCH_DATA, SEARCH_WORD } from "../actions/types";

const INIT_STATE = {
  data: "",
  word: "",
  isFecthing: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, data: action.payload };
    case SEARCH_WORD:
      return { ...state, word: action.payload };
    default:
      return state;
  }
};
