import { createContext, useState } from "react";

export const themeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      if (newMode === "light") document.body.classList.add("light");
      else document.body.classList.remove("light");
      return newMode;
    });
  };

  return (
    <themeContext.Provider value={{ mode: theme, toggleMode: toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};
