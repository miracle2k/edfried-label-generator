import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getQuestionText, getQuestionAnswers, getAnswerText } from '../data';

export class Question extends React.Component {
  static navigationOptions = {
    title: 'Question',
  };

  handleAnswer = (answer) => () => {
    const { onAnswer } = this.props.navigation.state.params;
    onAnswer(answer);
  };

  componentDidMount() {
    console.log('Question', this.props.navigation.state.params.question);
  }

  render() {
    const { question } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>{getQuestionText(question)}</Text>
        {getQuestionAnswers(question).map((answer, i) => (
          <TouchableOpacity onPress={this.handleAnswer(answer)} key={i}>
            <Text>{getAnswerText(answer)}</Text>
          </TouchableOpacity>
        ))}
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
  settings: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  newProduct: {

  },
});