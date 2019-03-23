import React from 'react';
import PropTypes from 'prop-types';
import {Touchable, Screen, Box, Subheader, Text, Bold, Padding, Flex, Row, Column, Divider, Absolute} from '../components';
import {Questions, Answers, getAnswer, replyQuestion, startReplying, getRecordCode, getCode, Replies} from '../data';

export class RepliesScreen extends React.Component {
  static propTypes = {
    record: PropTypes.object.isRequired,
    replies: PropTypes.object.isRequired,
    onSelectedQuestion: PropTypes.func,
    onSelectedPrice: PropTypes.func,
  };

  handleSelectQuestion = (question, i) => () => {
    this.props.onSelectedQuestion(question, i);
  };

  handleSelectPrice = () => {
    this.props.onSelectedPrice();
  };

  renderQuestion = (question, i) => {
    let answer = Replies.getAnswer(this.props.replies) (question);
    return (
      <Touchable onPress={this.handleSelectQuestion(question, i)} key={i}>
        <Padding double bottom={Padding.NONE}>
          <Row>
            <Text size={Text.SIZE.SMALL}>{Questions.getText(question)}</Text> 
            <Text align={Text.ALIGN.RIGHT}>{Answers.getText(answer)}</Text> 
          </Row>
        </Padding>
      </Touchable>
    );
  };

  render() {
    const {replies, record} = this.props;
    return (
      <Column flex={Flex.FULL} justify={Flex.JUSTIFY.CENTER}>
        <Padding>
          <Box>
            <Padding double>
              <Row>
                <Subheader>Antwort bearbeiten</Subheader> 
                <Bold color={Text.COLOR.SUBHEADER}>{getCode(record)}</Bold>
              </Row>
            </Padding>
            <Divider/>
            {Replies.getQuestions(replies).map(this.renderQuestion)}
            <Touchable onPress={this.handleSelectPrice}>
              <Padding double>
                <Row>
                  <Text size={Text.SIZE.SMALL}>Preis:</Text> 
                  <Text align={Text.ALIGN.RIGHT}>{record.price}</Text> 
                </Row>
              </Padding>
            </Touchable>
          </Box>
        </Padding>
      </Column>
    );
  }
}
