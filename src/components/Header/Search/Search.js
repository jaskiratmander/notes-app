import { useState, useRef, useEffect } from "react";
import styles from "./Search.module.css";
import SearchOverlay from "./SearchOverlay";

const Search = ({ query, onInputChange, onClear }) => {
  const [allowOverlay, setAllowOverlay] = useState(true);
  const inputRef = useRef(null);

  const disableOverlay = () => {
    setAllowOverlay(false);
  };

  const enableOverlay = () => {
    setAllowOverlay(true);
  };

  const blurInput = () => {
    inputRef.current.blur();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27 && allowOverlay) {
        e.preventDefault();
        disableOverlay();
        blurInput();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [allowOverlay]);

  return (
    <form
      className={styles.search}
      onFocus={enableOverlay}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles["search-logo-wrapper"]}>
        <span className={`material-symbols-outlined ${styles["search-logo"]}`}>
          search
        </span>
      </div>
      <input
        type="search"
        placeholder="Search Notes"
        value={query}
        ref={inputRef}
        onChange={onInputChange}
      ></input>
      {query !== "" && allowOverlay && (
        <SearchOverlay
          query={query}
          onClear={onClear}
          onClose={disableOverlay}
        />
      )}
    </form>
  );
};

export default Search;
