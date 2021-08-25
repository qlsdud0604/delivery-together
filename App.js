import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Main from './source/Main';

export default function App() {
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Main />
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
