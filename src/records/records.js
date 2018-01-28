import { format } from 'date-fns';
import { Answer, getAnswerCode } from '../questions';

type Record = {
  id: number,
  timestamp: number,
  answers: object,
  answerCodes: string[],
  price: number,
};

export const getRecordCode = (record: Record): string => {
  const [firstCode, ...restCodes] = record.answerCodes;
  const year = new Date(record.timestamp).getFullYear() - 2000;
  return [firstCode, year, ...restCodes, record.id].join('');
};

export const toCsv = (records: Record[]): string => {
  const keys = Object.keys(
    records.reduce((entries, record) => ({ ...entries, ...record.answers }), {})
  );
  const header = [
    '#', 
    'date', 
    'code', 
    'price', 
    ...keys
  ].map((s) => `"${s}"`).join(',');
  const toCsvRow = (record: Record) => [
    record.id,
    format(new Date(record.timestamp), 'DD.MM.YYYY'),
    getRecordCode(record),
    record.price,
    ...keys.map((key) => record.answers[key] || ''),
  ].map((s) => `"${s}"`).join(',');
  return [
    header, 
    ...records.map(toCsvRow),
  ].join('\n');
};