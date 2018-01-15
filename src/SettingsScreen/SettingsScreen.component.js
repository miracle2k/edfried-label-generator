import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { primaryColor, backgroundColor, borderColor, textColor, subheaderColor, fontSize } from '../style';

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
    const { rootAnswer, rootAnswers, records, setSelectedIndex } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.subheader}>Questions</Text>
            <Text style={styles.row}>Root answer: {rootAnswer.Name}</Text>
          </View>
          <View style={styles.cardActions}>
            <Text style={styles.cardAction}>IMPORT</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.subheader}>Records</Text>
            <Text style={styles.row}>Records: {records.length}</Text>
          </View>
          <View style={styles.cardActions}>
            <Text style={styles.cardAction}>EXPORT</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  card: {
    minWidth: 300,
    marginBottom: 30,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: 'white',
  },
  subheader: {
    fontSize: fontSize,
    color: subheaderColor,
  },
  row: {
    fontSize: fontSize,
  },
  cardContent: {
    padding: 20,
    fontSize: fontSize,
  },
  cardAction: {
    borderTopWidth: 1,
    borderTopColor: borderColor,
    padding: 20,
    fontSize: fontSize,
    color: primaryColor,
    textAlign: 'center',
  },
});
