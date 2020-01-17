
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux/reducers'
import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
    return (
      <Provider store={createStore(reducers)}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
      </Provider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
