import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './source/Main';

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
