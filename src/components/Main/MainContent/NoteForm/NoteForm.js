import { useContext, useEffect, useRef } from "react";
import styles from "./NoteForm.module.css";
import { themeContext } from "../../../../context/ThemeContext";

const NoteForm = ({ data, disabled, inputChangeHandler }) => {
  const headingRef = useRef(null);
  const { mode } = useContext(themeContext);

  useEffect(() => {
    const node = headingRef.current;
    if (!disabled) {
      node.focus();
    }
    return () => node.blur();
  }, [disabled]);

  return (
    <form
      className={`${styles.note_form} ${
        mode === "light" ? styles["color-grey"] : ""
      }`}
    >
      <input
        className={styles.form_heading}
        value={data.heading}
        onChange={(e) => {
          inputChangeHandler(e, "heading");
        }}
        placeholder={"Enter Title"}
        disabled={disabled}
        ref={headingRef}
      ></input>
      <textarea
        className={styles.form_text}
        value={data.text}
        placeholder={"Enter Content"}
        onChange={(e) => {
          inputChangeHandler(e, "content");
        }}
        disabled={disabled}
      ></textarea>
    </form>
  );
};

export default NoteForm;
