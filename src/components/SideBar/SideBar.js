import styles from "./SideBar.module.css";
import { changeActiveContext } from "../../context/ActiveStateContext";
import { useContext } from "react";
import NotesList from "./NotesList/NotesList";

const SideBar = () => {
  const changeState = useContext(changeActiveContext);
  return (
    <div className={styles.sidebar}>
      <div className={styles["cta-wrapper"]}>
        <button
          className={styles.cta}
          onClick={() => {
            changeState({ active: "ADD" });
          }}
        >
          <span className={styles["cta_text"]}>New Note</span>
          <span className={`material-symbols-outlined ${styles["cta_add"]}`}>
            upload
          </span>
        </button>
      </div>
      <div className={styles["quick-access"]}>
        <p className={styles["quick-access-heading"]}>Quick Access</p>
        <NotesList />
      </div>
    </div>
  );
};

export default SideBar;
