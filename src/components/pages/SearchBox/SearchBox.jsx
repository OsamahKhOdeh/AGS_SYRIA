import React from "react";
import "./SearchBox.css";

const SearchBox = ({ onChange }) => {
  return (
    <div className="search_div">
      <input
        className="search_box"
        type="text"
        placeholder="Search.."
        name="search2"
         autocomplete="on"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
