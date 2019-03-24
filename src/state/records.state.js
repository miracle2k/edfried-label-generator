import {createSelector} from 'reselect';
import {createReducer} from '../utility';
import {Answer, Record, RecordEdits, Records, Replying, getAnswers, getReplies, getAnswersKeys} from '../data';
import {questionariesSelectors} from './questionaries.state';

const initialState = {
  counter: 1,
  items: {},
};

// Action types

export const recordsActionTypes = {
  SAVE_RECORD: 'SAVE_RECORD',
  ERASE_RECORDS: 'ERASE_RECORDS',
};

// Reducers

const recordsReducer = createReducer({
  [recordsActionTypes.SAVE_RECORD]: (state, {record}) => ({ 
    counter: state.counter + 1,
    items: {
      ...state.items, 
      [record.id]: record,
    },
  }),
  [recordsActionTypes.ERASE_RECORDS]: (state) => ({
    counter: 1,
    items: {},
  }),
}, initialState);

export const recordsReducers = {records: recordsReducer};

// Actions

const saveRecord = (record: Record) => ({ 
  type: recordsActionTypes.SAVE_RECORD, 
  record,
});

const eraseRecords = () => ({
  type: recordsActionTypes.ERASE_RECORDS,
});

const createRecord = (replying: Replying, price: string) => (dispatch, getState) => {
  let state = getState();
  let id = nextId(state);
  let questionary = questionariesSelectors.questionary(state);
  let answersKeys = getAnswersKeys(replying);
  let record = Records.createRecord(id, questionary, answersKeys, price);
  dispatch(saveRecord(record));
};

const editRecord = (record: Record, edits: RecordEdits) => (dispatch, getState) => {
  let state = getState();
  dispatch(saveRecord(Records.editRecord(record, edits)));
};

export const recordsActions = {saveRecord, eraseRecords, createRecord, editRecord};

// Selectors

const nextId = (state): number => state.records.counter;

const records = createSelector(
  (state) => state.records,
  (records): Record[] => {
    return Object.values(records.items).sort(
      (r0, r1) => Records.getTime(r0) - Records.getTime(r1),
    );
  },
);

const lastRecord = createSelector(
  records,
  (records: Record[]): ?Record => records[records.length - 1],
);

const lastReplies = createSelector(
  lastRecord, 
  (record: ?Record): ?Replying => record && getReplies(record),
);

export const recordsSelectors = {nextId, records, lastRecord, lastReplies};
