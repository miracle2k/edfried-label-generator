import {format} from 'date-fns';
import {Questions} from './questions';
import {Answers} from './answers';
import {generateUid} from '../utility';
import {Replying, replyQuestion, startReplying, getQuestions, getAnswers, getAnswer, getQuestion, getAnswersByQuestionKeys} from './replying';

export type Record = {
  id: string,
  code: string,
  price: string,
  questionary: Questionary,
  answersKeys: number[],
  createdAt: number,
  editedAt: number,
};

export const createRecord = (id: string, questionary: Questionary, answersKeys: number[], price: string) => ({
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

export const getCode = (record: Record): string => {
  let [firstCode, ...codes] = getAnswers(getReplies(record)).map(Answers.getCode).filter(Boolean);
  let year = new Date(record.createdAt).getFullYear() - 2000;
  return [firstCode, year, ...codes, record.id].join('');
};

const getTime = (record: Record) => record.editedAt || record.createdAt;

export type RecordEdits = {
  answersKeys?: number[],
  price?: string,
};

export const editRecord = (record: Record, edits: RecordEdits) => ({
  ...record,
  answersKeys: edits.answersKeys || record.answersKeys,
  price: edits.price || record.price,
  editedAt: new Date().getTime(),
});

export const toCsv = (records: Record[]): string => {
  let toCsvRow = (cells) => cells.map((s) => `"${s}"`).join(',');
  let replies = records.map(getReplies);
  let answersByQuestionKeys = replies.map(getAnswersByQuestionKeys);
  let questionsKeys = Object.keys(Object.assign({}, ...answersByQuestionKeys));
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
      getCode(record),
      record.price,
      ...questionsKeys.map(
        (questionKey: string) => Answers.getText(answersByQuestionKeys[i] [questionKey]) || '',
      ),
    ]),
  );
  return [headerRow, ...recordsRows].join('\n');
};

export const Records = {createRecord, getReplies, getTime, editRecord, getCode};
