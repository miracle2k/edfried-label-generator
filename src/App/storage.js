import { AsyncStorage } from 'react-native';

export const saveState = (state) => {
  console.log('saveState', state);
  const value = JSON.stringify(state);
  return AsyncStorage.setItem('state', value);
};

export const loadState = () => {
  return AsyncStorage.getItem('state')
  .then((value) => JSON.parse(value));
};

export const persistStore = (store) => {
  store.subscribe(() => {
    saveState(store.getState());
  });

  loadState()
  .then((state) => {
    if (state) {
      store.dispatch({ type: 'persisted state load', state });
    }
  });

  return store;
};

export const persistReducer = (reducer) => (state, action) => {
  console.log('redux', state, action);
  if (action.type === 'persisted state load') {
    return action.state;
  } else {
    return reducer(state, action);
  }
};


