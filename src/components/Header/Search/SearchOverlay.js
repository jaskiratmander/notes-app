import styles from "./SearchOverlay.module.css";
import { createPortal } from "react-dom";
import SearchResults from "./SearchResults";

const SearchOverlay = ({ query, onClear, onClose }) => {
  return (
    <>
      {createPortal(
        <div className={styles.backdrop} onClick={onClose}></div>,
        document.body
      )}
      {createPortal(
        <div className={styles.search_overlay}>
          <SearchResults query={query} onClear={onClear} />
        </div>,
        document.body
      )}
    </>
  );
};

export default SearchOverlay;
