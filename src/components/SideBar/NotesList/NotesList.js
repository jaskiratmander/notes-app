import { useContext, useState } from "react";
import { changeActiveContext } from "../../../context/ActiveStateContext";
import styles from "./NotesList.module.css";
import { NotesContext } from "../../../context/NotesContext";

const NotesList = () => {
  const changeActiveState = useContext(changeActiveContext);
  const { notes } = useContext(NotesContext);
  const [quickAccessIds, setQuickAccessIds] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData("plain/text");
    const note = notes.find((note) => note.noteId === noteId);
    if (note) {
      if (!quickAccessIds.includes(noteId)) {
        setQuickAccessIds((prev) => [...prev, noteId]);
      }
    }
  };

  return (
    <div
      className={styles["drop_zone"]}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {quickAccessIds.length === 0 && (
        <div className={styles["quick-access-info"]}>
          <span
            className={`material-symbols-outlined ${styles["quick-access_icon"]}`}
          >
            add_notes
          </span>
          <p className={styles["quick-access-info-text"]}>
            Click or Drag notes here to access them quickly
          </p>
        </div>
      )}
      {quickAccessIds.length !== 0 && (
        <ul className={styles.notes_list}>
          {quickAccessIds.map((noteId) => {
            const note = notes.find((note) => note.noteId === noteId);
            if (note) {
              return (
                <li className={styles.note} key={note.noteId}>
                  <button
                    onClick={() => {
                      changeActiveState({
                        active: "NOTE",
                        selectedNoteId: note.noteId,
                      });
                    }}
                  >
                    {note.title}
                  </button>
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}
    </div>
  );
};

export default NotesList;
