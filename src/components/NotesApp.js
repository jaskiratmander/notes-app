import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import styles from "./NotesApp.module.css";
import { activeStateContext } from "../context/ActiveStateContext";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import Main from "../components/Main/Main";
import { ClipLoader } from "react-spinners";
import { themeContext } from "../context/ThemeContext";

const NotesApp = () => {
  const { notes, isLoading } = useContext(NotesContext);
  const { active } = useContext(activeStateContext);
  const { mode } = useContext(themeContext);
  const classes = `${styles.container} ${styles[mode]}`;

  return (
    <div className={classes}>
      <Header userName={"Jaskirat"} />
      <SideBar />
      {isLoading ? (
        <main className={styles.loader_wrapper}>
          <ClipLoader className={styles.loader} />
        </main>
      ) : (
        <Main notes={notes} key={active} />
      )}
    </div>
  );
};

export default NotesApp;
