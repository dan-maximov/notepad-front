import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default ({ navigation }) => (
  <Touchable
    style={styles.textWrapper}
    onPress={() => navigation.navigate('Note', { new: true })}
  >
    <Text style={styles.text}>＋</Text>
  </Touchable>
);

const styles = StyleSheet.create({
  textWrapper: {
    marginRight: 12,
  },
  text: {
    fontSize: 30,
    fontWeight: '900',
    color: '#51A0D5',
  },
});
