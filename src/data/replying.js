import {format} from 'date-fns';
import {Questionary, Question, Questions} from './questions';
import {Answer, Answers} from './answers';
import {generateUid, last} from '../utility';

export type Replying = {
  questionary: Questionary,
  questions: Question[],
  answers: {
    [questionKey: string]: Answer,
  },
  nextQuestions: Question[],
};

export const startReplyingQuestions = (questionary: Questionary): Replying => {
  return {
    questionary,
    questions: [],
    answers: {},
    nextQuestions: Answers.getQuestions(questionary),
  };
};

export const replyQuestion = (replying: Replying, answer: Answer): Replying => {
  let [question, ...questions] = replying.nextQuestions;
  return {
    ...replying,
    questions: [...replying.questions, question],
    answers: {
      ...replying.answers, 
      [Questions.getKey(question)]: answer,
    }, 
    nextQuestions: [...Answers.getQuestions(answer), ...questions],
  };
};

export const undoReply = (replying: Replying): Replying => {
  let questions = replying.questions.slice(0, -1);
  let question = last(replying.questions);
  return question ? {
    ...replying,
    questions: questions,
    answers: {
      ...replying.answers, 
      [Questions.getKey(question)]: undefined,
    }, 
    nextQuestions: [question, ...replying.nextQuestions],
  } : replying;
};

export const getAnswer = (replying: Replying, question: Question): Answer => {
  return replying.answers[Questions.getKey(question)];
};

export const getNextQuestion = (replying: Replying): ?Question => {
  return replying.nextQuestions[0];
};

export const getAnswersKeys = (replying: Replying): string[] => {
  return replying.questions.map(
    (question) => Answers.getKey(replying.answers[Questions.getKey(question)]),
  );
};