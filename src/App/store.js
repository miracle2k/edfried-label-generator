import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducers as questionsReducers } from '../questions';
import { reducers as recordsReducers } from '../records';

const reducer = combineReducers({
  ...questionsReducers,
  ...recordsReducers,
});

const middleware = applyMiddleware(thunkMiddleware);

export const store = createStore(reducer, middleware);

// export const saveState = (getState) => () => {
//   global.localStorage.setItem('state', JSON.stringify(getState()));
// };

// export const loadState = () => {
//   try {
//     return JSON.parse(global.localStorage.getItem('state'));  
//   } catch (e) {
//     return undefined;
//   }
// };