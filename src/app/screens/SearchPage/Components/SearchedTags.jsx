import React from 'react';

const SearchedTags = ({ hashtagsData, actions, close }) => {
  const count = hashtagsData.reduce((hashtag, amount) => {
    hashtag[amount] = (hashtag[amount] || 0) + 1;
    return hashtag;
  }, {});
  return Object.entries(count).map(([key, value]) =>
    value >= 5 ? (
      <li
        key={key}
        onClick={() => {
          actions.fetchData(key)
          actions.sendSearchData(key);
          close()
        }}
      >
        #{key}
        <span>{value}</span>
      </li>
    ) : null
  );
}


export default SearchedTags;
