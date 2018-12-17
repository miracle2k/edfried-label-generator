import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { primaryColor, subheaderColor, backgroundColor, borderColor, grayedColor, textColor, fontSize, shadow } from '../style';
import { Record, getRecords, getRecordCode } from '../records';

export class HomeScreenComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    records: PropTypes.array.isRequired,
  };

  handleNewProduct = () => {
    const { navigate } = this.props.navigation;
    navigate('CreateRecordScreen');
  };

  handleSettings = () => {
    const { navigate } = this.props.navigation;
    navigate('SettingsScreen');
  };

  render() {
    const { records } = this.props;
    const lastCode = records.length && getRecordCode(records[records.length - 1]);
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.subheader}>Letzter Code:</Text>
            <Text style={styles.code}>{lastCode || '-'}</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={this.handleNewProduct}>
              <Text style={styles.newProduct}>NEUES PRODUKT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={this.handleSettings} style={styles.settings}>
          <Icon name="settings" size={20} color={textColor}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  card: {
    minWidth: 300,
    borderRadius: 2,
    backgroundColor: 'white',
    ...shadow,
  },
  cardContent: {
    padding: 20,
  },
  cardActions: {
    borderTopWidth: 1,
    borderTopColor: borderColor,
  },
  settings: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10,
  },
  newProduct: {
    padding: 20,
    fontSize: fontSize,
    textAlign: 'center',
    color: primaryColor,
  },
  code: {
    fontSize: fontSize * 1.5,
    textAlign: 'center',
  },
  subheader: {
    color: subheaderColor,
    fontSize: fontSize,
  }
});