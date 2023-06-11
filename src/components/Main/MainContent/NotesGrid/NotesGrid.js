import styles from "./NotesGrid.module.css";
import NoteItem from "./NoteItem";
import { useEffect, useRef } from "react";

const NotesGrid = ({ notes }) => {
  const gridRef = useRef();

  useEffect(() => {
    const node = gridRef.current;
    const storedPosition = localStorage.getItem("scrollPosition");
    if (storedPosition !== null) {
      node.scrollTop = storedPosition;
    }

    const handleScroll = () => {
      localStorage.setItem("scrollPosition", node.scrollTop);
    };

    node.addEventListener("scroll", handleScroll);

    return () => {
      node.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className={styles.notes_grid} ref={gridRef}>
      {notes.map((note) => (
        <NoteItem note={note} key={note.noteId} />
      ))}
    </div>
  );
};

export default NotesGrid;
