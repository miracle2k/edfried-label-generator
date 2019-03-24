import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Box, Text, Bold, Subheader, Padding, Flex, Row, Column, Divider, Absolute, Touchable, SettingsIcon, EditIcon} from '../components';
import {primaryColor, backgroundColor, grayedColor, textColor} from '../style';
import {Record, getRecords, getRecordCode, getAnswer, Questions, Answers, startReplying, Records, getCode, Replies} from '../data';
import {questionariesReducers, recordsReducers} from '../state';

export class HomeScreenComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    lastRecord: PropTypes.object,
    lastReplies: PropTypes.object,
    questionary: PropTypes.object,
  };

  handleSettings = () => {
    let {navigation} = this.props;
    navigation.push('SettingsScreen');
  };

  handleNewProduct = () => {
    let {navigation, questionary} = this.props;
    let replying = startReplying(questionary);
    let params = {replying};
    navigation.push('CreateQuestionScreen', params);
  };

  handleEdit = () => {
    let {navigation, lastRecord, lastReplies} = this.props;
    let record = lastRecord;
    let replies = lastReplies;
    let params = {record, replies};
    navigation.push('EditRepliesScreen', params);
  };

  renderQuestion = (question, i) => {
    let answer = Replies.getAnswer(this.props.lastReplies) (question);
    return (
      <Row key={i}>
        <Text size={Text.SIZE.SMALL}>{Questions.getText(question)}</Text> 
        <Text size={Text.SIZE.SMALL} align={Text.ALIGN.RIGHT}>{Answers.getText(answer)}</Text>
      </Row>
    );
  };

  renderLastRecord = () => {
    const {lastRecord, lastReplies} = this.props;
    return lastRecord && lastReplies ? (
      <Padding>
        <Padding>
          <Row>
            <Subheader>Letztes Produkt:</Subheader>
            <Touchable onPress={this.handleEdit}>
              <Row>
                <EditIcon color={primaryColor}/>
                <Text color={Text.COLOR.PRIMARY} size={Text.SIZE.SMALL}>Edit</Text>
              </Row>
            </Touchable>
          </Row>
        </Padding>
        <Padding top={Padding.NONE}>
          <Row>
            <Text size={Text.SIZE.SMALL}>Code:</Text> 
            <Bold size={Text.SIZE.SMALL} align={Text.ALIGN.RIGHT}>{getCode(lastRecord)}</Bold>
          </Row>
          {Replies.getQuestions(lastReplies).map(this.renderQuestion)}
          <Row>
            <Text size={Text.SIZE.SMALL}>Preis:</Text> 
            <Text size={Text.SIZE.SMALL} align={Text.ALIGN.RIGHT}>{lastRecord.price}</Text>
          </Row>
        </Padding>
      </Padding>
    ) : null;
  };

  render = () => {
    return (
      <Column flex={Flex.FULL} justify={Flex.JUSTIFY.CENTER}>
        <Padding>
          <Box>
            {this.renderLastRecord()}
            <Divider/>
            <Touchable onPress={this.handleNewProduct}>
              <Padding double>
                <Text align={Text.ALIGN.CENTER} color={Text.COLOR.PRIMARY}>NEUES PRODUKT</Text>
              </Padding>
            </Touchable>
          </Box>
        </Padding>
        <Absolute bottom right>
          <Touchable onPress={this.handleSettings}>
            <Padding half>
              <SettingsIcon/>
            </Padding>
          </Touchable>
        </Absolute>
      </Column>
    );
  };
}
