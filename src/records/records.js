import { Answer, getAnswerCode } from '../questions';

type Record = {
  id: number,
  date: Date,
  price: number,
  answers: Answer[],
};

export const getRecordCode = (record: Record): string => {
  const [firstAnswer, restAnswers] = record.answers.map(getAnswerCode);
  const year = record.date.getFullYear() - 2000;
  return [firstAnswer, year, ...restAnswers, record.id].join('');
};

export const toCsv = (records: Record[]): string => {
  // const toCsvHeader = () => .map(toCsv).join('\n');
  // const toCsvRow = () => {
  //   const cells = record.answers.map(getAnswerCode);
  //   return [
  //     record.id,
  //     record.date.toUTCString(),
  //     record.date.price,
  //     ...cells,
  //   ].join(';');
  // };

  return [
  //   toCsvHeader(records),
  //   ...records.map(toCsvRow),
  ].join('\n');
};