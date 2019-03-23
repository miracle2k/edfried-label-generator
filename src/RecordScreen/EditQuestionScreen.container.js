import React from 'react';
import {connect} from 'react-redux';
import {replyQuestion, undoReply, getAnswersKeys, getNextQuestion, hasAnsweredQuestions, skipSimpleQuestions} from '../data';
import {questionsSelectors, recordsActions, recordsSelectors} from '../state';
import {Answers} from '../data';
import {QuestionScreen} from './QuestionScreen.component';

export const EditQuestionScreen = connect(
  (state, props) => ({
    record: props.navigation.getParam('record'),
    replying: props.navigation.getParam('replies'),
    question: getNextQuestion(props.navigation.getParam('replies')),
  }),
  (dispatch, props) => ({
    onAnswer: (answerKey) => {
      let record = props.navigation.getParam('record');
      let prevReplies = props.navigation.getParam('replies');
      let replies = skipSimpleQuestions(replyQuestion(prevReplies, answerKey));
      if (replies.nextQuestions.length) {
        let params = {record, replies};
        return props.navigation.setParams(params);
      } else {
        let answersKeys = getAnswersKeys(replies);
        dispatch(recordsActions.editRecord(record, {answersKeys}));
        props.navigation.goBack();
      }
    },
    onBack: () => {
      let record = props.navigation.getParam('record');
      let prevReplies = props.navigation.getParam('replies');
      if (hasAnsweredQuestions(prevReplies)) {
        let replies = undoReply(prevReplies);
        let params = {record, replies};
        props.navigation.setParams(params);
      } else {
        props.navigation.goBack();
      }
    },
  }),
) (QuestionScreen);
