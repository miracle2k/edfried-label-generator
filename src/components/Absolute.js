import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {fontSizes, colors, shadow} from '../style';

export class Absolute extends React.PureComponent {
  static propTypes = {
    top: PropTypes.bool,
    right: PropTypes.bool,
    bottom: PropTypes.bool,
    left: PropTypes.bool,
    children: PropTypes.any,
    styles: PropTypes.object,
  };

  render() {
    const {top, right, bottom, left, children, styles} = this.props;
    const style = [
      absoluteStyles.container, 
      top && absoluteStyles.top, right && absoluteStyles.right, bottom && absoluteStyles.bottom, left && absoluteStyles.left, 
      styles,
    ];
    return (
      <View style={style}>
        {children}
      </View>
    );
  }
}

const absoluteStyles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  top: {
    top: 0,
  },
  right: {
    right: 0,
  },
  bottom: {
    bottom: 0,
  },
  left: {
    left: 0,
  },
});
