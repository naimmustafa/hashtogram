import _ from "lodash";
import {
  hashtagArray,
  timeStamp,
  likeCount,
  findLessCompetativeScraper
} from "./hashtagArray";

export const sortData = data => {
  const timeStampes = timeStamp(data);
  const hashtagSets = hashtagArray(data);
  const likesNum = likeCount(data);
  const hashFilter = new RegExp("(?:^|[ ])#([a-zA-Z0-9]+)", "g");
  const int = new RegExp("\\d+", "g");
  const hashtags =
    hashtagSets === null ? [] : hashtagSets.map(item => item.match(hashFilter));
  const postTime =
    timeStampes === null ? [] : timeStampes.map(item => item.match(int));
  const likes = likesNum === null ? [] : likesNum.map(item => item.match(int));
  // redux edits

  const result =
    likesNum === undefined || likesNum === null
      ? {}
      : Object.assign(
          ...postTime.map((k, i) => ({
            [i]: {
              likes: likes[i][0],
              time: postTime[i][0],
              hashtag: hashtags[i]
            }
          }))
        );
  const filtered =
    likesNum === undefined || likesNum === null
      ? {}
      : Object.assign(
          ...Object.entries(result).map(([k, v]) =>
            v.likes <= 25 || v.hashtag === null ? {} : { [k]: v }
          )
        );
  const hede = Object.entries(filtered).map(([k, v]) => v.hashtag);
  const merged = [].concat.apply([], hede);
  const dups =
    merged === null ? null : merged.filter((v, i, a) => a.indexOf(v) < i);
  const unique = [...new Set(dups)];
  const sorted = _.chunk(unique, 30).map(item => {
    return item;
  });
  return sorted;
};

export const commonSorted = data => {
  const re = new RegExp("(?:^|[ ])#([a-zA-Z0-9]+)", "g");
  const match = data.match(re);
  const dups =
    match === null ? null : match.filter((v, i, a) => a.indexOf(v) < i);
  const unique = [...new Set(dups)];
  const sorted = _.chunk(unique, 30).map(item => {
    return item;
  });
  return sorted;
};

export const leveler = postNumber => {
    if (postNumber <= 50000) {
      return "Not Competitive";
    } else if (postNumber <= 150000 && postNumber > 50000) {
      return "Slightly Competitive";
    } else if (postNumber <= 1500000 && postNumber > 150000) {
      return "Competitive";
    } else if (postNumber <= 5000000 && postNumber > 1500000) {
      return "Very Competitive";
    } else {
      return "Extremely Competitive";
    }
  }

  export const findLessCompetativeSort = (pagesAll, tags) => {
    const string = findLessCompetativeScraper(pagesAll)
    const competation = string
      ? string.map(item =>
          item[0].replace(`"edge_hashtag_to_media":{"count":`, "")
        )
      : 0;
    let result = Object.assign(
      ...tags.map((k, i) => ({ [k]: competation[i] }))
    );
    return Object.assign(
      ...Object.entries(result).map(([k, v]) => (v >= 350000 ? {} : { [v]: k }))
    );
  }
