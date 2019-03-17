import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {questionsSelectors, recordsActions, recordsSelectors} from '../state';
import {QuestionScreen} from './QuestionScreen.component';

export const CreateQuestionScreen = connect(
  (state, props) => ({
    question: getNextQuestion(props.navigation.params.replying),
  }),
  (dispatch, props) => ({
    onAnswer: (answer) => {
      let replying = replyQuestion(props.replying, answer);
      if (replying.nextQuestions.length) {
        let params = {replying};
        props.navigation.setParams(params);
      } else {
        let answersKeys = getAnswersKeys(replying);
        props.navigation.navigate('CreatePriceScreen', {answersKeys});
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
