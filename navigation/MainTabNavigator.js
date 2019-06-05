import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Notes from '../screens/NotesScreen';
import Note from '../screens/NoteScreen';

const NotesStack = createStackNavigator({
  Notes,
  Note,
});

NotesStack.navigationOptions = {
  tabBarLabel: 'Notes',
  tabBarVisible: false,
};

export default createBottomTabNavigator({
  NotesStack,
});
