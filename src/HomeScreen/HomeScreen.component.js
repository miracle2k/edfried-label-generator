import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { primaryColor, subheaderColor, backgroundColor, borderColor, grayedColor, textColor, fontSize } from '../style';
import { Record, getRecords, getRecordCode } from '../records';

export class HomeScreenComponent extends React.Component {
  static navigationOptions = {
    title: 'Product Label Generator',
  };

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
            <Text style={styles.subheader}>Last code:</Text>
            <Text style={styles.code}>{lastCode || '-'}</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={this.handleNewProduct}>
              <Text style={styles.newProduct}>NEW PRODUCT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={this.handleSettings} style={styles.settings}>
          <Ionicons name="md-settings" size={20} color={textColor}/>
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
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: 'white',
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