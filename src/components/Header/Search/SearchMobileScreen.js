import { useRef, useEffect } from "react";
import styles from "./SearchMobileScreen.module.css";
import SearchResults from "./SearchResults";

const SearchMobileScreen = ({ query, onQueryChange, closeSearch }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const currentInputNode = inputRef.current;

    currentInputNode.focus();

    return () => {
      currentInputNode.blur();
    };
  });

  return (
    <div className={styles["search_screen"]}>
      <div className={styles["search_form_wrapper"]}>
        <form className={styles["search_screen_form"]}>
          <div className={styles["search-logo-wrapper"]}>
            <span
              className={`material-symbols-outlined ${styles["search-logo"]}`}
            >
              search
            </span>
          </div>
          <input
            placeholder="Search Notes"
            value={query}
            onChange={onQueryChange}
            ref={inputRef}
          ></input>
        </form>
        <button
          className={styles["cancel_btn"]}
          onClick={(e) => {
            e.preventDefault();
            closeSearch();
          }}
        >
          Cancel
        </button>
      </div>
      {query !== "" && <SearchResults query={query} onClear={closeSearch} />}
    </div>
  );
};

export default SearchMobileScreen;
