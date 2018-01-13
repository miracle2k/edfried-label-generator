import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { answers, getAnswerQuestions, getRecordCode } from '../data';

const ask = (navigation, rootAnswer) => {
  const askQuestion = (question) => {
    return new Promise((resolve, reject) => {
      navigation.navigate('Question', { 
        question, 
        onAnswer (answer) {
          navigation.dispatch(NavigationActions.back());
          resolve(answer);
        },
      });
    });
  };

  const askQuestions = (questions) => {
    return Promise.all(questions.map((question) => 
      askQuestion(question).then((answer) => askOnAnswer(answer))
    ));
  };

  const askOnAnswer = (answer) => {
    return askQuestions(getAnswerQuestions(answer))
    .then((answers) => [answer].concat(...answers));
  };

  return askOnAnswer(rootAnswer);
};

export class Home extends React.Component {
  static navigationOptions = {
    title: 'Product Label Generator',
  };

  handleNewProduct = () => {
    ask(this.props.navigation, answers[0])
    .then((result) => {
      console.log('answered', getRecordCode(result, 17, 12));
    });
  };

  handleSettings = () => {
    const { navigate } = this.props.navigation;
    navigate('Settings');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleNewProduct} style={styles.newProduct}>
          <Text>New Product</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSettings} style={styles.settings}>
          <Text>Settings</Text>
        </TouchableOpacity>
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