import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {fontSizes, colors, shadow} from '../style';

export class Box extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    styles: PropTypes.object,
  };

  render() {
    const {children, styles} = this.props;
    return (
      <View style={[boxStyles.box, styles]}>
        {children}
      </View>
    );
  }
}

const boxStyles = StyleSheet.create({
  box: {
    borderRadius: 2,
    backgroundColor: colors.background,
    ...shadow,
  },
});
