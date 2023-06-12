import { AuthContext } from "@/context/AuthContext";
import { themeContext } from "../../context/ThemeContext";
import styles from "./Header.module.css";
import SearchWrapper from "./SearchWrapper";
import { useContext } from "react";

const Header = ({ userName }) => {
  const { mode, toggleMode } = useContext(themeContext);
  const { logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <button
        className={`${styles.logo} ${
          mode === "light" ? styles["color-primary"] : ""
        }`}
      >
        Notefy
      </button>
      <SearchWrapper />

      <button onClick={toggleMode} className={styles["theme_mode"]}>
        <span className={`material-symbols-outlined ${styles["mode_icon"]}`}>
          {mode === "light" ? "dark_mode" : "light_mode"}
        </span>
      </button>

      <div
        className={`${styles["profile"]} ${
          mode === "light" ? styles["color-grey"] : ""
        }`}
      >
        <span className={`material-symbols-outlined ${styles["profile_icon"]}`}>
          account_circle
        </span>
        <span className={styles["profile_text"]}>{userName}</span>
        <span
          className={`material-symbols-outlined ${styles["profile_expand"]}`}
        >
          expand_more
        </span>
      </div>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;
