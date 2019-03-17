import React from 'react';
import PropTypes from 'prop-types';
import {Touchable, Screen, Box, Text, Bold, Padding, Flex, Row, Column, Divider, Absolute} from '../components';
import {Questions, Answers} from '../data';

export class Question extends React.Component {
  static propTypes = {
    question: PropTypes.any.isRequired,
    onAnswer: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  handleAnswer = (answer) => () => {
    this.props.onAnswer(answer);
  };

  handleBack = () => {
    this.props.onBack();
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  };

  render() {
    const {question} = this.props;
    return (
      <Column flex={Flex.FULL} justify={Flex.JUSTIFY.CENTER}>
        <Padding>
          <Box>
            <Text>{Questions.getText(question)}</Text>
            {Questions.getAnswers(question).map((answer, i) => (
              <Touchable onPress={this.handleAnswer(answer)} key={i}>
                <Text>{Answers.getText(answer)}</Text>
              </Touchable>
            ))}
          </Box>
        </Padding>
      </Column>
    );
  }
}
{/*
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
});*/}