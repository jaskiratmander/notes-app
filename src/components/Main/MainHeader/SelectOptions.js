import { useState } from "react";
import styles from "./SelectOptions.module.css";

const SelectOptions = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("oldest");
  return (
    <select
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(e.target.value);
        onSelect(e.target.value === "newest" ? "DESC" : "ASC");
      }}
      className={styles["select_box"]}
    >
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
    </select>
  );
};

export default SelectOptions;
