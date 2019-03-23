import {Question} from './questions';

export type Answer = {
  Name: string,
  Code: string,
  Questions: Question[],
} | string;

const getCode = (answer) => answer.Code;

const getText = (answer) => answer && answer.Name || answer || '';

const getQuestions = (answer) => typeof answer === 'object' ? answer.Questions : [];

export const Answers = {
  getCode, 
  getText,
  getQuestions,
};
