import React from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {HomeScreen} from '../HomeScreen';
import {SettingsScreen} from '../SettingsScreen';
import {CreateQuestionScreen, CreatePriceScreen, EditRepliesScreen, EditQuestionScreen, EditPriceScreen} from '../RecordScreen';
import {store} from './store';

const Navigator = createStackNavigator({
  HomeScreen: {screen: HomeScreen},
  SettingsScreen: {screen: SettingsScreen},
  CreateQuestionScreen: {screen: CreateQuestionScreen},
  CreatePriceScreen: {screen: CreatePriceScreen},
  EditRepliesScreen: {screen: EditRepliesScreen},
  EditQuestionScreen: {screen: EditQuestionScreen},
  EditPriceScreen: {screen: EditPriceScreen},
}, {
  defaultNavigationOptions: {
    title: 'Produkt Labels',
    headerTruncatedBackTitle: 'Zurück',
    headerTitleStyle: {
      fontWeight: 'normal',
    }
  }
});

const AppContainer = createAppContainer(Navigator);

export const App = () => (
  <Provider store={store}>
    <AppContainer>
      <Navigator/>
    </AppContainer>
  </Provider>
);
