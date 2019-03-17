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
  }),
  (dispatch, props) => ({
    onSubmit: (price) => {
      dispatch(recordsActions.createRecord(props.navigation.params.replying, price));
    },
    onBack: () => {
      let replying = undoReply(props.navigation.params.replying);
      let params = {replying};
      return props.navigation.navigate('CreateQuestionScreen', params);
    },
  }),
) (PriceScreen);
