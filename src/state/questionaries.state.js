import {defaultQuestionaries, Questionary, Answer, Record, Records} from '../data';
import {createReducer} from '../utility';

const initialState = {
  items: defaultQuestionaries,
  selectedIndex: 0,
};

// Action types

export const questionariesActionTypes = {
  SET_SELECTED_QUESTIONARY: 'SET_SELECTED_QUESTIONARY',
  SET_QUESTIONARIES: 'SET_QUESTIONARIES',
};

// Reducers

const questionariesReducer = createReducer({
  [questionariesActionTypes.SET_SELECTED_QUESTIONARY]: (state, {selectedIndex}) => ({ 
    ...state,
    selectedIndex: state.items[selectedIndex] ? selectedIndex : state.selectedIndex,
  }),
  [questionariesActionTypes.SET_QUESTIONARIES]: (state, {items}) => ({
    items: items,
    selectedIndex: 0,
  }),
}, initialState);

export const questionariesReducers = {questionaries: questionariesReducer};

// Actions

const setQuestionaries = (questionaries: Questionary[]) => ({
  type: questionariesActionTypes.SET_QUESTIONARIES, 
  questionaries,
});

const setSelectedQuestionary = (selectedIndex: number) => ({
  type: questionariesActionTypes.SET_SELECTED_QUESTIONARY,
  selectedIndex,
});

export const questionariesActions = {setQuestionaries, setSelectedQuestionary};

// Selectors

const selectedIndex = (state): number => state.questionaries.selectedIndex;

const questionaries = (state): Questionary[] => state.questionaries.items;

const questionary = (state): Questionary => state.questionaries.items[state.questionaries.selectedIndex];

export const questionariesSelectors = {questionaries, questionary, selectedIndex};

