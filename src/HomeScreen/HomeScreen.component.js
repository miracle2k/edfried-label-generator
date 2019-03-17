import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Box, Text, Bold, Padding, Flex, Row, Column, Divider, Absolute, Touchable} from '../components';
import {primaryColor, subheaderColor, backgroundColor, borderColor, grayedColor, textColor, fontSize, shadow} from '../style';
import {Record, getRecords, getRecordCode} from '../data';
import {questionariesReducers, recordsReducers} from '../state';

export class HomeScreenComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    lastRecord: PropTypes.object,
    lastReplies: PropTypes.object,
  };

  handleSettings = () => {
    let {navigate} = this.props.navigation;
    navigate('SettingsScreen');
  };

  handleNewProduct = () => {
    let {navigate} = this.props.navigation;
    navigate('CreateQuestionScreen');
  };

  handleEdit = () => {
    let {navigate, lastRecord, lastReplies} = this.props.navigation;
    let record = lastRecord;
    let replies = lastReplies;
    let params = {record, replies};
    navigate('EditRepliesScreen', params);
  };

  renderQuestion = (question, i) => {
    let answer = getAnswer(this.props.lastReplies, question);
    return (
      <Text key={i} size={Text.SIZE.SMALL}>{Questions.getText(question)}: {Answes.getText(answer)}</Text>
    );
  };

  renderLastRecord = () => {
    const {lastRecord, lastReplies} = this.props;
    return lastRecord && lastReplies ? (
      <Padding>
        <Padding>
          <Row>
            <Text>Letztes Produkt:</Text>
            <Touchable onPress={this.handleEdit}>
              <Row>
                <Icon name="edit" size={20} color={primaryColor}/>
                <Text color={Text.COLOR.PRIMARY} size={Text.SIZE.SMALL}>Edit</Text>
              </Row>
            </Touchable>
          </Row>
        </Padding>
        <Padding top={Padding.NONE}>
          <Text key={key} size={Text.SIZE.SMALL}>Code: <Bold size={Text.SIZE.SMALL}>{getRecordCode(lastRecord)}</Bold></Text>
          {lastReplies.questions.map(this.renderQuestion)}
          <Text key={key} size={Text.SIZE.SMALL}>Preis: {lastRecord.price}</Text>
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
              <Icon name="settings" size={20} color={textColor}/>
            </Padding>
          </Touchable>
        </Absolute>
      </Column>
    );
  };
}
