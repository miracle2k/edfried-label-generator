import { Answer, getAnswerCode } from '../questions';

type Record = {
  id: number,
  date: Date,
  answers: Answer[],
  price: number,
};

export const getRecordCode = (record: Record): string => {
  const [firstAnswer, restAnswers] = record.answers.map(getAnswerCode);
  const year = record.date.getFullYear() - 2000;
  return [firstAnswer, year, ...restAnswers, record.id].join('');
};

