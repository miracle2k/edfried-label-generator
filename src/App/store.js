import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducers as questionsReducers } from '../questions';
import { reducers as recordsReducers } from '../records';
import { persistStore, persistReducer } from './storage';

const reducer = persistReducer(combineReducers({
  ...questionsReducers,
  ...recordsReducers,
}));

const middleware = applyMiddleware(thunkMiddleware);

export const store = persistStore(createStore(reducer, middleware));