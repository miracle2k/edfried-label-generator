import React from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {HomeScreen} from '../HomeScreen';
import {SettingsScreen} from '../SettingsScreen';
import {CreateQuestionScreen, CreatePriceScreen, RepliesScreen, EditQuestionScreen, EditPriceScreen} from '../RecordScreen';
import {store} from './store';

const Navigator = createStackNavigator({
  HomeScreen: {screen: HomeScreen},
  SettingsScreen: {screen: SettingsScreen},
  CreateQuestionScreen: {screen: CreateQuestionScreen},
  CreatePriceScreen: {screen: CreatePriceScreen},
  EditQuestionScreen: {screen: EditQuestionScreen},
  EditPriceScreen: {screen: EditPriceScreen},
  EditRepliesScreen: {screen: RepliesScreen},
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
