import { createContext, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { changeActiveContext } from "./ActiveStateContext";

export const NotesContext = createContext();
const userId = "64865efc5dfd8e0fd4e00b89";

async function fetchNotes({ queryKey }) {
  const [_key, userId] = queryKey;
  try {
    const url = `https://grumpy-boot-bull.cyclic.app/notes/${userId}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateNoteRequest(updatedNote) {
  try {
    const url = `https://grumpy-boot-bull.cyclic.app/notes/${updatedNote.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addNoteRequest({ newNote, userId }) {
  try {
    const url = `https://grumpy-boot-bull.cyclic.app/notes/${userId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteNoteRequest(noteId) {
  try {
    const url = `https://grumpy-boot-bull.cyclic.app/notes/${noteId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const NotesProvider = ({ children }) => {
  const changeActiveState = useContext(changeActiveContext);
  // const { userId } = useContext(AuthContext);
  const {
    data: notes,
    error: queryError,
    isLoading,
    refetch,
  } = useQuery([`RETRIEVE_NOTES_${userId}`, userId], fetchNotes);

  const {
    mutate: updateMutate,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation(updateNoteRequest, {
    onSuccess: async (res) => {
      await refetch();
      changeActiveState({ active: "NOTE", selectedNoteId: res.id });
    },
  });

  const {
    mutate: addMutate,
    isLoading: isAdding,
    error: addError,
  } = useMutation(addNoteRequest, {
    onSuccess: async (res) => {
      await refetch();
      changeActiveState({ active: "NOTE", selectedNoteId: res.id });
    },
  });

  const {
    mutate: deleteMutate,
    isLoading: isDeleting,
    error: deleteError,
  } = useMutation(deleteNoteRequest, {
    onSuccess: async () => {
      await refetch();
      changeActiveState({ active: "GRID" });
    },
  });

  const updateNote = async (updatedNote) => {
    try {
      updateMutate(updatedNote);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNote = async (newNote) => {
    try {
      addMutate({ newNote, userId });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      deleteMutate(noteId);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    notes,
    queryError,
    updateError,
    addError,
    deleteError,
    isAdding,
    isLoading,
    isUpdating,
    isDeleting,
    updateNote,
    addNote,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
