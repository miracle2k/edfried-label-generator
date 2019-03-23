import React from 'react';
import PropTypes from 'prop-types';
import {BackHandler} from 'react-native';
import {Touchable, Screen, Box, Text, Bold, Subheader, Padding, Flex, Row, Column, Divider, Absolute, BackIcon} from '../components';
import {Questions, Answers, getNextQuestion} from '../data';

export class QuestionScreen extends React.Component {
  static propTypes = {
    question: PropTypes.any.isRequired,
    onAnswer: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  static navigationOptions = ({navigation, screenProps}) => ({
    headerLeft: <Touchable onPress={navigation.getParam('onBack')}><Padding><BackIcon/></Padding></Touchable>,
  });

  handleAnswer = (answer, i) => () => {
    this.props.onAnswer(i);
  };

  handleBack = () => {
    this.props.onBack();
    return true;
  };

  componentDidMount() {
    this.props.navigation.setParams({onBack: this.handleBack});
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  };

  render() {
    const {question} = this.props;
    return (
      <Screen>
        <Column flex={Flex.FULL} justify={Flex.JUSTIFY.CENTER}>
          <Padding>
            <Box>
              <Padding double>
                <Subheader>{Questions.getText(question)}</Subheader>
              </Padding>
              <Divider/>
              {Questions.getAnswers(question).map((answer, i) => (
                <Padding key={i} double top={i === 0 ? Padding.DOUBLE : Padding.NONE}>
                  <Touchable onPress={this.handleAnswer(answer, i)}>
                    <Text>{Answers.getText(answer)}</Text>
                  </Touchable>
                </Padding>
              ))}
            </Box>
          </Padding>
        </Column>
      </Screen>
    );
  }
}
