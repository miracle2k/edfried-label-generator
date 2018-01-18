import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectors as questionsSelectors, actions as questionsActions } from '../questions';
import { selectors as recordsSelectors } from '../records';
import { SettingsScreenComponent } from './SettingsScreen.component';

export const SettingsScreenContainer = connect(
  (state) => ({
    rootAnswers: questionsSelectors.rootAnswers(state),
    rootAnswer: questionsSelectors.rootAnswer(state),
    selectedIndex: questionsSelectors.selectedIndex(state),
    records: recordsSelectors.records(state),
  }),
  (dispatch) => bindActionCreators({
    setRootAnswers: questionsActions.setRootAnswers,
    setSelectedIndex: questionsActions.setSelectedIndex,
  }, dispatch)
) (SettingsScreenComponent);
