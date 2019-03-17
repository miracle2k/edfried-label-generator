import React from 'react';
import PropTypes from 'prop-types';
import {Touchable, Screen, Box, Text, Bold, Padding, Flex, Row, Column, Divider, Absolute} from '../components';
import {Questions, Answers, getAnswer, replyQuestion, startReplying} from '../data';

export class RepliesScreen extends React.Component {
  static propTypes = {
    record: PropTypes.any.isRequired,
    replies: PropTypes.func.isRequired,
    navigation: PropTypes.any.isRequired,
  };

  handleSelectQuestion = (question) => () => {
    let {navigate} = this.props.navigation;
    let {record} = this.props;
    let answersKeys = record.answersKeys.slice(0, i);
    let replies = answersKeys.reduce(replyQuestion, startReplying(record.questionary));
    let params = {replies, record};
    navigate('EditQuestionScreen', params);
  };

  handleSelectPrice = () => {
    let {navigate} = this.props.navigation;
    let {record} = this.props;
    let params = {record};
    navigate('EditPriceScreen', params);
  };

  renderQuestion = (question, i) => {
    let answer = getAnswer(this.props.replies, question);
    return (
      <Touchable onPress={this.handleSelectQuestion(question, i)} key={i}>
        <Text>{Questions.getText(question)}: {Answers.getText(answer)}</Text>
      </Touchable>
    );
  };

  render() {
    const {replies, record} = this.props;
    return (
      <Column flex={Flex.FULL} justify={Flex.JUSTIFY.CENTER}>
        <Padding>
          <Box>
            <Padding>
              <Text>Edit label <Bold size={Text.SIZE.SMALL}>{getRecordCode(record)}</Bold></Text>
            </Padding>
            {replies.map(this.renderQuestion)}
            <Touchable onPress={this.handleSelectPrice}>
              <Padding>
                Price: {record.price}
              </Padding>
            </Touchable>
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