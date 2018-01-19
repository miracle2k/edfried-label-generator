import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationActions } from 'react-navigation'; 
import { Question } from './Question.js';
import { Price } from './Price.js';
import { getAnswerQuestions, getQuestionAnswers, getAnswerCode, getQuestionKey, getAnswerText } from '../questions';

export class CreateRecordScreenComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    rootAnswer: PropTypes.any.isRequired,
    createRecord: PropTypes.func.isRequired,
  };
  
  state = {
    question: null,
    questions: [],
    answers: {},
    answerCodes: [],
    price: 0,
  };

  handleRootAnswer = (answer) => {
    const answers = { [getQuestionKey(null)]: getAnswerText(answer) };
    const answerCodes = [getAnswerCode(answer)];
    const [question, ...questions] = getAnswerQuestions(answer);
    this.setState({ answers, answerCodes, question, questions });
  };

  handleAnswer = (answer) => {
    const [question, ...questions] = [...this.state.questions, ...getAnswerQuestions(answer)];
    const answerCodes = [...this.state.answerCodes, getAnswerCode(answer)];
    const answers = {
      ...this.state.answers, 
      [getQuestionKey(this.state.question)]: getAnswerText(answer),
    };
    this.setState({ answers, answerCodes, question, questions }, () => {
      if (question) {
        const questionAnswers = getQuestionAnswers(question);
        if (questionAnswers.length === 1) {
          this.handleAnswer(questionAnswers[0]);
        }
      }
    });
  };

  handlePriceChange = (price) => {
    this.setState({ price });
  };

  handleSubmit = () => {
    const { answers, answerCodes, price } = this.state;
    this.props.createRecord(answers, answerCodes, price);
    this.props.navigation.dispatch(NavigationActions.back()); 
  };

  componentDidMount() {
    this.handleRootAnswer(this.props.rootAnswer);
  }

  render() {
    const { question, price } = this.state;
    return question ? (
      <Question question={question} onAnswer={this.handleAnswer}/>
    ) : (
      <Price price={price} onPriceChange={this.handlePriceChange} onSubmit={this.handleSubmit}/>
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