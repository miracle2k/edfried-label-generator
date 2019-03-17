import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView} from 'react-native';
import {fontSizes, colors, shadow} from '../style';

export class Screen extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    styles: PropTypes.object,
  };

  render() {
    const {children, styles} = this.props;
    return (
      <View style={[screenStyles.container, styles]}>
        <ScrollView>
          {children}
        </ScrollView>
      </View>
    );
  }
}

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
