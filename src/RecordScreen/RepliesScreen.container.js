import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {questionsSelectors, recordsActions, recordsSelectors} from '../state';
import {Questions, Answers, getAnswer, replyQuestion, startReplying, getRecordCode} from '../data';
import {RepliesScreen as RepliesScreenComponent} from './RepliesScreen.component';

export const RepliesScreen = connect(
  (state, props) => ({
    record: props.navigation.getParam('record'),
    replies: props.navigation.getParam('replies'),
  }),
  (dispatch, props) => ({
    onSelectedQuestion: (question, i) => {
      let record = props.navigation.getParam('record');
      let answersKeys = record.answersKeys.slice(0, i);
      let replies = answersKeys.reduce(replyQuestion, startReplying(record.questionary));
      let params = {replies, record};
      props.navigation.replace('EditQuestionScreen', params);
    },
    onSelectedPrice: () => {
      let record = props.navigation.getParam('record');
      let replies = props.navigation.getParam('replies');
      let params = {record, replies};
      props.navigation.replace('EditPriceScreen', params);
    },
  }),
) (RepliesScreenComponent);
