import { useEffect, useState } from "react";
import Search from "./Search/Search";
import SearchMobile from "./Search/SearchMobile";

const SearchWrapper = () => {
  const [isSmallWidth, setIsSmallWidth] = useState(false);
  const [queryInput, setQueryInput] = useState("");

  const clearQuery = () => {
    setQueryInput("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallWidth(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleInputChange = (e) => {
    setQueryInput(e.target.value);
  };

  return !isSmallWidth ? (
    <Search
      query={queryInput}
      onInputChange={handleInputChange}
      onClear={clearQuery}
    />
  ) : (
    <SearchMobile
      query={queryInput}
      onInputChange={handleInputChange}
      isActive={queryInput !== ""}
      onClear={clearQuery}
    />
  );
};

export default SearchWrapper;
