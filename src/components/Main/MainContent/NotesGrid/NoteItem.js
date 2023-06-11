import styles from "./NoteItem.module.css";
import { changeActiveContext } from "../../../../context/ActiveStateContext";
import { useContext } from "react";

const convertUTCtoDate = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];

  return { day, month, year };
};

const NoteItem = ({ note }) => {
  const changeActiveState = useContext(changeActiveContext);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("plain/text", note.noteId);
  };
  const { day, month, year } = convertUTCtoDate(note.createdAt);

  return (
    <div
      className={styles.note_item}
      onClick={() => {
        changeActiveState({ active: "NOTE", selectedNoteId: note.noteId });
      }}
      onDragStart={handleDragStart}
      draggable
    >
      <h3 className={styles["title"]}>{note.title}</h3>
      <p className={styles["trimmed_content"]}>{note.content}</p>
      <div className={styles["date"]}>
        <span className={styles["month"]}>{month}</span>
        <span>
          {day}
          {","}
          {year}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;
