import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {questionsSelectors, recordsActions, recordsSelectors} from '../state';
import {PriceScreen} from './PriceScreen.component';

export const EditPriceScreen = connect(
  (state, props) => ({
    price: props.navigation.params.record.price,
  }),
  (dispatch, props) => ({
    onSubmit: (price) => {
      dispatch(recordsActions.editRecord(props.navigation.params.record, {price}));
    },
    onBack: () => {
      props.navigation.dispatch(NavigationActions.back());
    },
  }, dispatch),
) (PriceScreen);
