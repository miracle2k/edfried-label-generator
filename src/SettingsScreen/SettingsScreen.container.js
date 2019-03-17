import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {questionariesSelectors, questionariesActions, recordsSelectors, recordsActions} from '../state';
import {SettingsScreenComponent} from './SettingsScreen.component';

export const SettingsScreenContainer = connect(
  (state) => ({
    questionaries: questionariesSelectors.questionaries(state),
    questionary: questionariesSelectors.questionary(state),
    selectedIndex: questionariesSelectors.selectedIndex(state),
    records: recordsSelectors.records(state),
  }),
  (dispatch) => bindActionCreators({
    setQuestionary: questionariesActions.setSelectedQuestionary,
    setQuestionaries: questionariesActions.setQuestionaries,
    eraseRecords: recordsActions.eraseRecords,
  }, dispatch)
) (SettingsScreenComponent);
