import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Touchable from 'react-native-platform-touchable';
import Swipeout from 'react-native-swipeout';

import NotesContext from '../components/NotesContext';

const getTitle = text => {
  if (text.length > 15) {
    return `${text.slice(0, 15)}...`;
  }
  return text;
};

const Note = ({ navigation, data }) => {
  const { removeNote } = useContext(NotesContext);

  const buttons = [
    {
      text: 'Delete',
      type: 'delete',
      onPress: () => {
        axios
          .post('http://localhost:3001/delete_note', { id: data.id })
          .then(() => removeNote(data.id));
      },
    },
  ];

  return (
    <Swipeout style={styles.note} backgroundColor="#fff" right={buttons}>
      <Touchable onPress={() => navigation.navigate('Note', { id: data.id })}>
        <Text style={styles.text}>{getTitle(data.text)}</Text>
      </Touchable>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  note: {
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default Note;
