import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  let navigate = useNavigate();
  const searchText = useRef<HTMLInputElement | null>(null);
  const doSearch = () => {
    const searchQuery = searchText?.current?.value;
    if (searchQuery) {
      navigate("/?query=" + searchQuery);
    } else navigate("/");
  };

  return (
    <div className="search__global_div">
      <input
        className="search__input"
        placeholder="Search Movies..."
        type="text"
        ref={searchText}
      />{" "}
      <button className="search__button" onClick={doSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
