import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {questionsSelectors, recordsActions, recordsSelectors} from '../state';
import {RepliesScreenComponent} from './RepliesScreen.component';

export const RepliesScreen = connect(
  (state) => ({
  
  }),
  (dispatch) => bindActionCreators({

  }, dispatch),
) (RepliesScreenComponent);
