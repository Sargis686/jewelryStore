import { useState } from "react";
import s from "./style.module.css"; // Make sure to update this path accordingly

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <div className={s["top-bar"]}>
        <div className={s["search-container"]}>
          <input
            type="text"
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={s["search-input"]}
          />
          <button className={s["search-button"]}>
            <img src="/assets/search.png" alt="Search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
