import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import parse from 'date-fns/parse';

const NotesContext = createContext();

export default NotesContext;

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001')
      .then(({ data: notes }) => setNotes(notes));
  }, []);

  const getNoteIndex = id => notes.findIndex(n => n.id === id);

  const updateNote = newNote => {
    const noteIndex = getNoteIndex(newNote.id);
    notes.splice(noteIndex, 1);
    setNotes([...notes, newNote]);
  };

  const removeNote = id => setNotes(notes.filter(n => n.id !== id));

  const addNote = note => {
    setNotes([note, ...notes]);
  };

  const getNoteById = id =>
    notes.find(n => n.id === id) || { text: '', id: 0, date: '1980-01-01' };

  const value = {
    notes: notes && notes.sort((a, b) => parse(b.time) - parse(a.time)),
    updateNote,
    removeNote,
    addNote,
    getNoteById,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
