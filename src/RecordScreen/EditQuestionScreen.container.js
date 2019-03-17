import React from 'react';
import {connect} from 'react-redux';
import {replyQuestion, undoReply, getAnswersKeys} from '../data';
import {questionsSelectors, recordsActions, recordsSelectors} from '../state';
import {QuestionScreen} from './QuestionScreen.component';

export const EditQuestionScreen = connect(
  (state, props) => ({
    record: props.navigation.params.record,
    replies: props.navigation.params.replies,
  }),
  (dispatch, props) => ({
    onAnswer: (answer) => {
      let replying = replyQuestion(props.replying, answer);
      if (replying.nextQuestions.length) {
        let params = {replying};
        return dispatch(navigation.setParams(params));
      } else {
        let answersKeys = getAnswersKeys(replying);
        dispatch(recordsActions.editRecord(props.navigation.params.record, {answersKeys}));
        props.navigation.goBack();
      }
    },
    onBack: () => {
      if (props.replying.questions.length) {
        let replying = undoReply(props.replying);
        let params = {replying};
        props.navigation.setParams(params);
      } else {
        props.navigation.goBack();
      }
    },
  }),
) (QuestionScreen);
