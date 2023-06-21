import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

export default function SearchBar({ keyword, keywordChange }) {
  const { locale } = React.useContext(LocaleContext);
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={
          locale === "en" ? "Search by Title ..." : "Cari berdasarkan judul ..."
        }
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
    </div>
  );
}

SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};
