import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as recordsActions } from '.,/records';
import { CreateRecordScreenComponent } from './HomeScreen.component';

export const CreateRecordScreenContainer = connect(
  (state) => ({

  }),
  (dispatch) => bindActionCreators({
    createRecord: recordsActions.createRecord
  }, dispatch)
) (CreateRecordScreenComponent);
