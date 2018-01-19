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
  ].join(';');
  const toCsvRow = (record: Record) => [
    record.id,
    new Date(record.timestamp).toUTCString(),
    record.price,
    getRecordCode(record),
    ...keys.map((key) => record.answers[key]),
  ].join(';');
  return [
    header, 
    ...records.map(toCsvRow),
  ].join('\n');
};