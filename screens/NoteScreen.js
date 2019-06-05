import React, { useContext, useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import axios from 'axios';

import NotesContext from '../components/NotesContext';

const NoteScreen = ({ navigation }) => {
  const { addNote, getNoteById, updateNote } = useContext(NotesContext);
  const id = useRef(navigation.getParam('id'));
  const isNew = useRef(navigation.getParam('new', false));
  const note = useRef(getNoteById(id.current));
  const noteText = useRef(null);

  useEffect(() => {
    return () => {
      save();
    };
  }, []);

  save = () => {
    const newText = noteText.current._lastNativeText;
    if (!newText) {
      return;
    }
    if (isNew.current) {
      return axios
        .post('http://localhost:3001/new_note', { text: newText })
        .then(({ data }) => {
          addNote(data);
        });
    }
    const { id, text } = note.current;
    if (text !== newText) {
      axios
        .post('http://localhost:3001/update_note', { id, text: newText })
        .then(({ data }) => updateNote(data));
    }
  };

  return (
    <TextInput
      style={{ flex: 1 }}
      multiline
      ref={noteText}
      defaultValue={note.current.text}
    />
  );
};

export default class extends React.Component {
  static navigationOptions = {
    title: 'Note',
  };

  render() {
    return <NoteScreen {...this.props} />;
  }
}
