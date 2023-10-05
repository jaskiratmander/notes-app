import styles from "./Main.module.css";
import MainContent from "./MainContent/MainContent";
import MainHeader from "./MainHeader/MainHeader";
import NoteForm from "./MainContent/NoteForm/NoteForm";
import { useContext, useEffect, useState, useMemo } from "react";
import { activeStateContext } from "../../context/ActiveStateContext";
import NotesSorter from "./NotesSorter";

const findNote = (notes, id) => {
  return notes?.find((note) => note.noteId === id);
};

const Main = ({ notes }) => {
  const { active, selectedNoteId, sort } = useContext(activeStateContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  let initialHeading = "";
  let initialText = "";

  let activeNote = useMemo(
    () => findNote(notes, selectedNoteId),
    [selectedNoteId, notes]
  );

  const [heading, setHeading] = useState(initialHeading);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    if (active !== "GRID" && active !== "ADD" && active !== "SORT") {
      setHeading(activeNote.title);
      setText(activeNote.content);
    }
  }, [activeNote, active]);

  const handleFormDataChange = (e, field) => {
    switch (field) {
      case "heading": {
        setHeading(e.target.value);
        break;
      }
      case "content": {
        setText(e.target.value);
        break;
      }
      default:
        return { heading: initialHeading, content: initialText };
    }
  };

  let content;
  if (active === "GRID") {
    content = <NotesSorter notes={notes} sortBy={sort} />;
  } else {
    content = (
      <NoteForm
        disabled={!isEditing && active !== "ADD"}
        data={{ heading, text }}
        inputChangeHandler={handleFormDataChange}
      />
    );
  }

  return (
    <main className={styles.main}>
      <MainHeader
        activeState={active}
        note={{ heading, text, id: selectedNoteId }}
        isEditing={isEditing}
        onEditStart={handleEditStart}
        onEditClose={handleEditClose}
      />
      <MainContent>{content}</MainContent>
    </main>
  );
};

export default Main;
