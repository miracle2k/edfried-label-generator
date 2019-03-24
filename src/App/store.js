import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from './storage';
import {questionariesReducers, recordsReducers} from '../state';

const reducer = persistReducer(combineReducers({
  ...questionariesReducers,
  ...recordsReducers,
}));

const middleware = applyMiddleware(thunkMiddleware);

export const store = persistStore(createStore(reducer, middleware));