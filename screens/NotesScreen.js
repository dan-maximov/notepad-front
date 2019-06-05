import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import NotesContext from '../components/NotesContext';
import AddNote from '../components/AddNote';
import Note from '../components/Note';

const NotesScreen = ({ navigation }) => {
  const { notes } = useContext(NotesContext);

  if (!notes) {
    return <Text>Loading...</Text>;
  }

  const renderItem = ({ item }) => <Note navigation={navigation} data={item} />;

  return (
    <FlatList
      alwaysBounceVertical={false}
      style={styles.container}
      data={notes}
      renderItem={renderItem}
      keyExtractor={({ id }) => id.toString()}
    />
  );
};

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Notes',
    headerRight: <AddNote navigation={navigation} />,
  });

  render() {
    return <NotesScreen {...this.props} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
