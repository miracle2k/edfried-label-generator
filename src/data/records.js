import {format} from 'date-fns';
import {Questions} from './questions';
import {Answers} from './answers';
import {generateUid} from '../utility';
import {Replying, replyQuestion, startReplying} from './replying';

export type Record = {
  id: string,
  questionary: Questionary,
  answersKeys: string[],
  price: string,
  createdAt: number,
  editedAt: number,
};

export const createRecord = (id: string, questionary: Questionary, answersKeys: string[], price: string) => ({
  id,
  questionary,
  answersKeys,
  price,
  createdAt: new Date().getTime(), 
  editedAt: undefined,
});

export const getReplies = (record: Record): Replying => {
  return record.answersKeys.reduce(replyQuestion, startReplying(record.questionary));
};

export type RecordEdits = {
  answersKeys?: string[],
  price?: string,
};

export const editRecord = (record: Record, edits: RecordEdits) => ({
  ...record,
  answersKeys: edits.answersKeys || record.answersKeys,
  price: edits.price || record.price,
  editedAt: new Date().getTime(),
});

export const getRecordCode = (record: Record): string => {
  let [firstCode, ...codes] = record.answersKeys;
  let year = new Date(record.timestamp).getFullYear() - 2000;
  return [firstCode, year, ...codes, record.id].join('');
};

export const toCsv = (records: Record[]): string => {
  let toCsvRow = (cells) => cells.map((s) => `"${s}"`).join(',');
  let replies = records.map(getReplies);
  let questionsKeys = Object.keys(Object.assign({}, ...replies.map((reply) => reply.answers)));
  let headerRow = toCsvRow([
    '#', 
    'date', 
    'code', 
    'price', 
    ...questionsKeys,
  ]);
  let recordsRows = records.map(
    (record: Record, i: number) => toCsvRow([
      record.id,
      format(new Date(record.createdAt), 'DD.MM.YYYY'),
      getRecordCode(record),
      record.price,
      ...questionsKeys.map(
        (questionKey: string) => replies[i] [questionKey] || '',
      ),
    ]),
  );
  return [headerRow, ...recordsRows].join('\n');
};

export const getTime = (record: Record) => record.editedAt || record.createdAt;

export const Records = {createRecord, getReplies, getTime};
