import { useContext } from "react";
import styles from "./MainContent.module.css";
import { themeContext } from "../../../context/ThemeContext";

const MainContent = ({ children }) => {
  const { mode } = useContext(themeContext);
  return (
    <div
      className={`${styles.main_content} ${
        mode === "light" ? styles[mode] : ""
      }`}
    >
      {children}
    </div>
  );
};

export default MainContent;
