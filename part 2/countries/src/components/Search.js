import React from "react";

const Search = ({ search, updateSearch }) => {
  return (
    <div>
      Search for <input value={search} onChange={updateSearch} />
    </div>
  );
};

export default Search;
