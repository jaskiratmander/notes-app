import { useContext } from "react";
import { changeActiveContext } from "../../../context/ActiveStateContext";
import { NotesContext } from "../../../context/NotesContext";
import MainHeaderContent from "./MainHeaderContent";
import SelectOptions from "./SelectOptions";
import styles from "./MainHeader.module.css";
import { ClipLoader } from "react-spinners";

const MainHeader = ({
  activeState,
  note,
  onEditStart,
  onEditClose,
  isEditing,
}) => {
  const { updateNote, deleteNote, addNote, isAdding, isDeleting, isUpdating } =
    useContext(NotesContext);
  const changeActiveState = useContext(changeActiveContext);

  const handleStateChange = (type) => {
    let changeObj = { active: type };
    if (type !== "GRID" && type !== "SORT") {
      changeObj.selectedNoteId = note.id;
    }
    changeActiveState(changeObj);
  };

  let heading;

  switch (activeState) {
    case "GRID":
    case "SORT": {
      heading = "All Notes";
      break;
    }
    case "NOTE":
    case "EDIT": {
      heading = note.heading;
      break;
    }
    case "ADD": {
      heading = "New Note";
      break;
    }
    default:
      return null;
  }

  const backToAllNotes = () => {
    changeActiveState({ active: "GRID" });
  };

  return (
    <MainHeaderContent
      active={activeState}
      heading={heading}
      backCb={backToAllNotes}
    >
      {activeState === "GRID" && (
        <SelectOptions
          onSelect={(selected) => {
            changeActiveState({ active: "GRID", sort: selected });
          }}
        />
      )}
      {activeState === "GRID" && (
        <button
          className={styles.cta}
          onClick={() => {
            changeActiveState({ active: "ADD" });
          }}
        >
          <span className={styles["cta_text"]}>New</span>
          <span className={`material-symbols-outlined ${styles["cta_add"]}`}>
            upload
          </span>
        </button>
      )}
      {activeState === "NOTE" && isEditing && (
        <>
          <button className={styles["header_btn"]} onClick={onEditClose}>
            <span class={`material-symbols-outlined ${styles["icon"]}`}>
              cancel
            </span>
            <span>Cancel</span>
          </button>
          <button
            className={styles["header_btn"]}
            onClick={() => {
              updateNote({
                title: note.heading,
                content: note.text,
                id: note.id,
              });
            }}
          >
            {isUpdating ? (
              <ClipLoader color={"#23272f"} size={18} />
            ) : (
              <span class={`material-symbols-outlined ${styles["icon"]}`}>
                save
              </span>
            )}
            <span>{isUpdating ? "Saving..." : "Save"}</span>
          </button>
        </>
      )}
      {activeState === "NOTE" && !isEditing && (
        <>
          <button className={styles["header_btn"]} onClick={onEditStart}>
            <span className={`material-symbols-outlined ${styles["icon"]}`}>
              edit
            </span>
            <span>Edit</span>
          </button>
          <button
            className={styles["header_btn"]}
            onClick={() => {
              deleteNote(note.id);
            }}
          >
            {isDeleting ? (
              <ClipLoader color={"#000"} size={18} />
            ) : (
              <span className={`material-symbols-outlined ${styles["icon"]}`}>
                delete
              </span>
            )}
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </button>
        </>
      )}
      {activeState === "ADD" && (
        <>
          <button
            className={styles["header_btn"]}
            onClick={() => {
              addNote({ title: note.heading, content: note.text });
            }}
          >
            {isAdding ? (
              <ClipLoader color={"#23272f"} size={18} />
            ) : (
              <span class={`material-symbols-outlined ${styles["icon"]}`}>
                save
              </span>
            )}
            <span>{isAdding ? "Saving..." : "Save"}</span>
          </button>
        </>
      )}
    </MainHeaderContent>
  );
};

export default MainHeader;
