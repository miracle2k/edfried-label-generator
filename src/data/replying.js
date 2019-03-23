import {format} from 'date-fns';
import {Questionary, Question, Questions} from './questions';
import {Answer, Answers} from './answers';
import {generateUid, last} from '../utility';

export type Replying = {
  questionary: Questionary,
  questionsKeys: string[],
  questionsByQuestionsKeys: {
    [questionKey: string]: Question,
  },
  answersKeysByQuestionsKeys: {
    [questionKey: string]: number,
  },
  nextQuestions: Question[],
};

export const startReplying = (questionary: Questionary): Replying => {
  return {
    questionary,
    questionsKeys: [],
    questionsByQuestionsKeys: {},
    answersKeysByQuestionsKeys: {},
    nextQuestions: Answers.getQuestions(questionary),
  };
};

export const replyQuestion = (replying: Replying, answerKey: number): Replying => {
  let [question, ...questions] = replying.nextQuestions;
  let questionKey = Questions.getKey(question);
  let answer = Questions.getAnswer(question, answerKey);
  return question && answer ? {
    ...replying,
    questionsKeys:  [...replying.questionsKeys, questionKey],
    questionsByQuestionsKeys: {
      ...replying.questionsByQuestionsKeys,
      [questionKey]: question,
    },
    answersKeysByQuestionsKeys: {
      ...replying.answersKeysByQuestionsKeys,
      [questionKey]: answerKey,
    },
    nextQuestions: [...Answers.getQuestions(answer), ...questions],
  } : replying;
};

const isSimple = (question: Question) => {
  return question && Questions.getAnswers(question).length === 1;
};

export const skipSimpleQuestions = (replying: Replying) => {
  while (isSimple(getNextQuestion(replying))) {
    replying = replyQuestion(replying, 0);
  }
  return replying;
};

export const undoReply = (replying: Replying): Replying => {
  let questionsKeys = replying.questionsKeys.slice(0, -1);
  let questionKey = last(replying.questionsKeys);
  let question = replying.questionsByQuestionsKeys[questionKey];
  return question ? {
    ...replying,
    questionsKeys: questionsKeys,
    questionsByQuestionsKeys: {
      ...replying.questionsByQuestionsKeys,
      [questionKey]: undefined,
    },
    answersKeysByQuestionsKeys: {
      ...replying.answersKeysByQuestionsKeys,
      [questionKey]: undefined,
    },
    nextQuestions: [question, ...replying.nextQuestions],
  } : replying;
};

export const hasAnsweredQuestions = (replying: Replying): boolean => {
  return getQuestionsKeys(replying).length;
}

export const getNextQuestion = (replying: Replying): ?Question => {
  return replying.nextQuestions[0];
};

export const getQuestionsKeys = (replying: Replying): string[] => {
  return replying.questionsKeys;
};

export const getQuestion = (replying: Replying) => (questionKey: string): Question => {
  return replying.questionsByQuestionsKeys[questionKey];
};

export const getQuestions = (replying: Replying): Question[] => {
  return getQuestionsKeys(replying).map(getQuestion(replying));
};

export const getAnswerKey = (replying: Replying) => (question: Question): number => {
  return replying.answersKeysByQuestionsKeys[Questions.getKey(question)];
};

export const getAnswer = (replying: Replying) => (question: Question): Answer => {
  return Questions.getAnswer(question, getAnswerKey(replying) (question));
};

export const getAnswers = (replying: Replying): Answer[] => {
  return getQuestions(replying).map(getAnswer(replying));
};

export const getAnswersKeys = (replying: Replying): number[] => {
  return getQuestions(replying).map(getAnswerKey(replying));
};

export const getAnswersByQuestionKeys = (replying: Replying): {[questionKey: string]: Answer} => {
  return getQuestionsKeys(replying).reduce(
    (result, questionKey) => {
      result[questionKey] = getAnswer(replying) (getQuestion(replying) (questionKey));
      return result;
    },
    {}
  );
};

export const Replies = {getQuestions, getAnswer, getAnswerKey, getAnswers};