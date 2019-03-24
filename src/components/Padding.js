import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {padding} from '../style';

export class Padding extends React.PureComponent {
  static DOUBLE = 'double';
  static SINGLE = 'single';
  static HALF = 'half';
  static NONE = 'none';

  static propTypes = {
    children: PropTypes.any,
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    double: PropTypes.bool,
    half: PropTypes.bool,
    none: PropTypes.bool,
  };

  render() {
    const {top, right, bottom, left, double, half, none, children} = this.props;
    const style = [
      paddingStyles.single, double && paddingStyles.double, half && paddingStyles.half, none && paddingStyles.none, 
      topPaddingStyles[top], rightPaddingStyles[right], bottomPaddingStyles[bottom], leftPaddingStyles[left],
    ];
    return (
      <View style={style}>
        {children}
      </View>
    );
  }
}

const paddingStyles = StyleSheet.create({
  double: {
    padding: 2 * padding,
  },
  single: {
    padding: padding,
  },
  half: {
    padding: padding / 2,
  },
  none: {
    padding: 0,
  },
});

const topPaddingStyles = StyleSheet.create({
  [Padding.DOUBLE]: {
    paddingTop: 2 * padding,
  },
  [Padding.SINGLE]: {
    paddingTop: padding,
  },
  [Padding.HALF]: {
    paddingTop: padding / 2,
  },
  [Padding.NONE]: {
    paddingTop: 0,
  },
});

const rightPaddingStyles = StyleSheet.create({
  [Padding.DOUBLE]: {
    paddingRight: 2 * padding,
  },
  [Padding.SINGLE]: {
    paddingRight: padding,
  },
  [Padding.HALF]: {
    paddingRight: padding / 2,
  },
  [Padding.NONE]: {
    paddingRight: 0,
  },
});

const bottomPaddingStyles = StyleSheet.create({
  [Padding.DOUBLE]: {
    paddingBottom: 2 * padding,
  },
  [Padding.SINGLE]: {
    paddingBottom: padding,
  },
  [Padding.HALF]: {
    paddingBottom: padding / 2,
  },
  [Padding.NONE]: {
    paddingBottom: 0,
  },
});

const leftPaddingStyles = StyleSheet.create({
  [Padding.DOUBLE]: {
    paddingLeft: 2 * padding,
  },
  [Padding.SINGLE]: {
    paddingLeft: padding,
  },
  [Padding.HALF]: {
    paddingLeft: padding / 2,
  },
  [Padding.NONE]: {
    paddingLeft: 0,
  },
});


