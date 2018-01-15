import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { backgroundColor, borderColor, textColor, subheaderColor, fontSize } from '../style';
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
        <View style={styles.card}>
          <Text style={styles.title}>{getQuestionText(question)}</Text>
          {/*<ScrollView>*/}
            {getQuestionAnswers(question).map((answer, i) => (
              <TouchableOpacity onPress={this.handleAnswer(answer)} key={i}>
                <Text style={styles.option}>{getAnswerText(answer)}</Text>
              </TouchableOpacity>
            ))}
          {/*</ScrollView>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 300,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: 'white',
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