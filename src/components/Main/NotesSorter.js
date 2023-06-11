import NotesGrid from "./MainContent/NotesGrid/NotesGrid";

const NotesSorter = ({ notes, sortBy }) => {
  if (!notes) {
    return <NotesGrid notes={[]} />;
  }
  const sortedNotes = [...notes].sort((noteA, noteB) => {
    return sortBy === "DESC" || !sortBy
      ? new Date(noteB.createdAt) - new Date(noteA.createdAt)
      : new Date(noteA.createdAt) - new Date(noteB.createdAt);
  });
  return <NotesGrid notes={sortedNotes} />;
};

export default NotesSorter;
