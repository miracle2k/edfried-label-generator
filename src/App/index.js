import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from '../Home';
import { Settings } from '../Settings';
import { Question } from '../Question';
import { StackNavigator } from 'react-navigation';

export const App = StackNavigator({
  Home: { screen: Home },
  Settings: { screen: Settings },
  Question: { screen: Question },
});