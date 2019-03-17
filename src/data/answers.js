import {Question} from './questions';

export type Answer = {
  Name: string,
  Code: string,
  Questions: Question[],
} | string;

const getKey = (answer) => (
  typeof answer === 'string' ? answer : 
    typeof answer === 'object' ? answer.Code : ''
);

const getText = (answer) => (
  typeof answer === 'string' ? answer :
    typeof answer === 'object' ? answer.Name : ''
);

const getQuestions = (answer) => (
  typeof answer === 'string' ? [] :
    typeof answer === 'object' ? answer.Questions : []
);

export const Answers = {
  getKey,
  getText,
  getQuestions,
};
