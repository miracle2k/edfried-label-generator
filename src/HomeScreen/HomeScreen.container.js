import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectors as recordsSelectors } from '.,/records';
import { HomeScreenComponent } from './HomeScreen.component';

export const HomeScreenContainer = connect(
  (state) => ({
    records: recordsSelectors.records(state),
  }),
  (dispatch) => bindActionCreators({
    
  }, dispatch)
) (HomeScreenComponent);
