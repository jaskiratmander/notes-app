import { useState } from "react";
import styles from "./SearchMobile.module.css";
import SearchMobileScreen from "./SearchMobileScreen";

const SearchMobile = ({ query, onInputChange, isActive, onClear }) => {
  const [isSearchActive, setIsSearchActive] = useState(isActive);
  const makeSearchActive = () => {
    setIsSearchActive(true);
  };
  const makeSearchInactive = () => {
    setIsSearchActive(false);
    onClear();
  };

  if (!isSearchActive)
    return (
      <button className={styles["search_btn"]} onClick={makeSearchActive}>
        <span className={`material-symbols-outlined ${styles["search_logo"]}`}>
          search
        </span>
      </button>
    );
  return (
    <SearchMobileScreen
      query={query}
      onQueryChange={onInputChange}
      closeSearch={makeSearchInactive}
    />
  );
};

export default SearchMobile;
