import { themeContext } from "../../../context/ThemeContext";
import styles from "./MainHeaderContent.module.css";
import { useContext } from "react";

const MainHeaderContent = ({ backCb, heading, active, children }) => {
  const { mode } = useContext(themeContext);
  return (
    <div
      className={`${styles["main_header"]} ${
        mode === "light" ? styles["light"] : ""
      }`}
    >
      <div className={styles["backBtn_wrapper"]}>
        {active !== "GRID" && active !== "SORT" && (
          <button className={styles["back_btn"]} onClick={backCb}>
            <span
              className={`material-symbols-outlined ${styles["back_icon"]}`}
            >
              keyboard_backspace
            </span>
            <span className={styles["back_btn_text"]}>All notes</span>
          </button>
        )}
      </div>
      <div className={styles["center_info"]}>
        <p className={styles["center_heading"]}>{heading}</p>
        <p className={styles["center_text"]}>
          {active === "EDIT" && "Editing..."}
        </p>
      </div>
      <div className={styles["header_actions"]}>{children}</div>
    </div>
  );
};

export default MainHeaderContent;
