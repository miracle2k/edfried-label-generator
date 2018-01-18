import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { backgroundColor, borderColor, textColor, subheaderColor, fontSize, shadow } from '../style';
import { getQuestionText, getQuestionAnswers, getAnswerText } from '../questions';

export class Question extends React.Component {
  static propTypes = {
    question: PropTypes.any.isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  handleAnswer = (answer) => () => {
    this.props.onAnswer(answer);
  };

  render() {
    const { question } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.title}>{getQuestionText(question)}</Text>
            {getQuestionAnswers(question).map((answer, i) => (
              <TouchableOpacity onPress={this.handleAnswer(answer)} key={i}>
                <Text style={styles.option}>{getAnswerText(answer)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  scroll: {
    padding: 32,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 64,
  },
  card: {
    minWidth: 300,
    borderRadius: 2,
    backgroundColor: 'white',
    ...shadow,
  },
  title: {
    padding: 20,
    fontSize: fontSize,
    color: subheaderColor,
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
  },
  option: {
    padding: 20,
    fontSize: fontSize,
    color: textColor,
  },
});