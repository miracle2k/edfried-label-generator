import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export class SettingsScreenComponent extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  static propTypes = {
    navigation: PropTypes.any.isRequired,
    rootAnswers: PropTypes.array.isRequired,
    rootAnswer: PropTypes.any.isRequired,
    records: PropTypes.array.isRequired,
    setRootAnswers: PropTypes.func.isRequired,
    setSelectedIndex: PropTypes.func.isRequired,
  };

  render() {
    const { rootAnswer, records } = this.props;
    return (
      <View style={styles.container}>
        <Text>Root answer: {rootAnswer.Name}</Text>
        <Text>Records: {records.length}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});