import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectors as questionsSelectors } from '../questions';
import { actions as recordsActions } from '../records';
import { CreateRecordScreenComponent } from './CreateRecordScreen.component';

export const CreateRecordScreenContainer = connect(
  (state) => ({
    rootAnswer: questionsSelectors.rootAnswer(state),
  }),
  (dispatch) => bindActionCreators({
    createRecord: recordsActions.createRecord
  }, dispatch)
) (CreateRecordScreenComponent);
