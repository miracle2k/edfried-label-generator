import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {colors} from '../style';

export class Divider extends React.PureComponent {
  static propTypes = {
    style: PropTypes.object,
  };

  render() {
    const {style} = this.props;
    return (
      <View style={[dividerStyles.container, style]}/>
    );
  }
}

const dividerStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
  },
});
