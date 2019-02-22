import React from "react";
import { FaSistrix } from "react-icons/fa";
import Spinner from "./Spinner";

const SearchBar = ({ searchWord, word, isFecthing, handleSearch }) => {
  return (
    <div className="content-container">
      <input
        type="text"
        placeholder="Search.."
        name="search"
        onChange={event => searchWord(event.target.value)}
      />
      <button
        type="button"
        onClick={
          word.length > 0
            ? () => handleSearch(word)
            : () => alert("type something")
        }
      >
        {isFecthing ? <Spinner /> : <FaSistrix />}
      </button>
    </div>
  );
};

export default SearchBar;
