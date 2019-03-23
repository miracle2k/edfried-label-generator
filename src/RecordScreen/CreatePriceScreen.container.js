import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {undoReply} from '../data';
import {questionsSelectors, recordsActions, recordsSelectors} from '../state';
import {PriceScreen} from './PriceScreen.component';

export const CreatePriceScreen = connect(
  (state, props) => ({
    price: '',
    replying: props.navigation.getParam('replying'),
  }),
  (dispatch, props) => ({
    onSubmit: (price) => {
      dispatch(recordsActions.createRecord(props.navigation.getParam('replying'), price));
      props.navigation.goBack();
    },
    onBack: () => {
      let replying = undoReply(props.navigation.getParam('replying'));
      let params = {replying};
      return props.navigation.replace('CreateQuestionScreen', params);
    },
  }),
) (PriceScreen);
