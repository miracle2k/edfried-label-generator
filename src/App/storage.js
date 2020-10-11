// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {log} from '../utility';

const rev = 1;

export const saveState = (state) => {
  log('saveState', state);
  state.rev = rev;
  const value = JSON.stringify(state);
  delete state.rev;
  return AsyncStorage.setItem('state', value);
};

export const loadState = () => {
  return AsyncStorage.getItem('state')
    .then((value) => JSON.parse(value))
    .then((state) => {
      log('loadState', state);
      if (state.rev !== rev) {
        log('store rev. has changed', state.rev, rev);
        return;
      }
      delete state.rev;
      return state;
    });
};

export const persistStore = (store) => {
  store.subscribe(() => {
    saveState(store.getState());
  });

  loadState()
    .then((state) => {
      if (state) {
        store.dispatch({type: 'persisted state load', state});
      }
    });

  return store;
};

export const persistReducer = (reducer) => (state, action) => {
  log('redux', state, action);
  if (action.type === 'persisted state load') {
    return action.state;
  } else {
    return reducer(state, action);
  }
};


