import { Answer, getAnswerCode } from '../questions';
import { createReducer } from '../utility';
import { Record } from './records';

export const initialState = {
  id: 1,
  list: [],
};

// Reducers

const recordsReducer = createReducer({
  'add record': (state, { record }) => ({ 
    id: state.id + 1,
    list: [...state.list, record],
  }),
  'erase records': (state) => ({
    id: state.id,
    list: [],
  }),
}, initialState);

export const reducers = { records: recordsReducer };

// Actions

const addRecord = (record: Record) => ({ type: 'add record', record });

const eraseRecords = () => ({ type: 'erase records' });

const createRecord = (answers: object, answerCodes: string[], price: number) => (dispatch, getState) => {
  const state = getState();
  const record = {
    id: selectors.nextId(state),
    timestamp: new Date().getTime(), 
    answers,
    answerCodes,
    price, 
  };
  dispatch(addRecord(record));
};

export const actions = { createRecord, eraseRecords };

// Selectors

const nextId = (state): number => state.records.id;

const records = (state): Record[] => state.records.list;

export const selectors = { nextId, records };

