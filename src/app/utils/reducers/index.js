import { combineReducers } from "redux";
import scraper from "./scraper";
import stats from "./stats";

export default combineReducers({
  data: scraper,
  hashtags: stats
});
