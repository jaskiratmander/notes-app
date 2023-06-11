import styles from "./SearchResults.module.css";
import { useContext } from "react";
import { NotesContext } from "../../../context/NotesContext";
import { changeActiveContext } from "../../../context/ActiveStateContext";

const matchQuery = (notes, query) => {
  if (query === "") return [];
  return notes.filter((note) => {
    return (
      note.title.trim().toLowerCase().substring(0, query.length) ===
      query.trim().toLowerCase()
    );
  });
};

const SearchResults = ({ query, onClear }) => {
  const { notes } = useContext(NotesContext);
  const changeActiveState = useContext(changeActiveContext);
  const matches = matchQuery(notes, query);

  return (
    <ul className={styles["results_list"]}>
      {matches.length === 0 && (
        <div className={styles["no_results"]}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 20 20"
            fill="none"
            fill-rule="evenodd"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"></path>
          </svg>
          <p>No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}
      {matches.length !== 0 &&
        matches.map((note) => (
          <li
            className={styles["results_item"]}
            key={note.noteId}
            onClick={() => {
              changeActiveState({
                active: "NOTE",
                selectedNoteId: note.noteId,
              });
              onClear();
            }}
          >
            <span
              className={`material-symbols-outlined ${styles["note_icon"]}`}
            >
              note
            </span>
            <span className={styles["results_text"]}>{note.title}</span>
            <span
              className={`material-symbols-outlined ${styles["return_icon"]}`}
            >
              keyboard_return
            </span>
          </li>
        ))}
    </ul>
  );
};

export default SearchResults;
