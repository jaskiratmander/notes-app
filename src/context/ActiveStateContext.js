import { createContext, useState } from "react";

export const activeStateContext = createContext(null);
export const changeActiveContext = createContext(null);

const initialState = {
  active: "GRID",
  sort: "oldest",
  selectedNoteId: null,
};

export const ActiveStateProvider = ({ children }) => {
  const [activeState, setActiveState] = useState(initialState);

  const handleActiveState = (newState) => {
    setActiveState((lastState) => {
      return { ...lastState, ...newState };
    });
  };

  return (
    <activeStateContext.Provider value={activeState}>
      <changeActiveContext.Provider value={handleActiveState}>
        {children}
      </changeActiveContext.Provider>
    </activeStateContext.Provider>
  );
};
