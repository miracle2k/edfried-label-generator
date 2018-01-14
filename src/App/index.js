import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from '../HomeScreen';
import { SettingsScreen } from '../SettingsScreen';
import { CreateRecordScreen } from '../CreateRecordScreen';
import { store } from './store';

const Navigator = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  SettingsScreen: { screen: SettingsScreen },
  CreateRecordScreen: { screen: CreateRecordScreen },
});

export const App = () => (
  <Provider store={store}>
     <Navigator/>
  </Provider>
);
