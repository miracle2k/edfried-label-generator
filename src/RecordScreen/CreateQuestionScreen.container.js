import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {questionsSelectors, recordsActions, recordsSelectors, questionariesSelectors} from '../state';
import {Answers, getNextQuestion, replyQuestion, startReplying, undoReply, getAnswersKeys, skipSimpleQuestions, hasAnsweredQuestions} from '../data';
import {QuestionScreen} from './QuestionScreen.component';

export const CreateQuestionScreen = connect(
  (state, props) => ({
    replying: props.navigation.getParam('replying'),
    question: getNextQuestion(props.navigation.getParam('replying')),
  }),
  (dispatch, props) => ({
    onAnswer: (answerKey) => {
      let prevReplying = props.navigation.getParam('replying')
      let replying = skipSimpleQuestions(replyQuestion(prevReplying, answerKey));
      if (replying.nextQuestions.length) {
        let params = {replying};
        props.navigation.setParams(params);
      } else {
        props.navigation.replace('CreatePriceScreen', {replying});
      }
    },
    onBack: () => {
      let prevReplying = props.navigation.getParam('replying');
      if (hasAnsweredQuestions(prevReplying)) {
        let replying = undoReply(prevReplying);
        let params = {replying};
        props.navigation.setParams(params);
      } else {
        props.navigation.goBack();
      }
    },
  }),
) (QuestionScreen);
