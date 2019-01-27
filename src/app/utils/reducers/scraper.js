import {
  FETCH_DATA,
  SEARCH_WORD,
  LOAD_SPINNER,
  KILL_SPINNER
} from "../actions/types";

const INIT_STATE = {
  data: "",
  word: "",
  isFecthing: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, data: action.payload, isFecthing: false };
    case SEARCH_WORD:
      return { ...state, word: action.payload };
    case LOAD_SPINNER:
      return { ...state, isFecthing: true };
    case KILL_SPINNER:
      return { ...state, isFecthing: false, data: "" };
    default:
      return state;
  }
};
