import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from '../HomeScreen';
import { SettingsScreen } from '../SettingsScreen';
import { CreateRecordScreen } from '../CreateRecordScreen';
import { store } from './store';

const Navigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  SettingsScreen: { screen: SettingsScreen },
  CreateRecordScreen: { screen: CreateRecordScreen },
}, {
  navigationOptions: {
    title: 'Product Label Generator',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
  },
});

const AppContainer = createAppContainer(Navigator);

export const App = () => (
  <Provider store={store}>
    <AppContainer>
     <Navigator/>
    </AppContainer>
  </Provider>
);
