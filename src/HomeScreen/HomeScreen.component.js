import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
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
        <Text>Last code: {lastCode || '-'}</Text>
        <Button onPress={this.handleNewProduct} title="New Product" style={styles.newProduct}/>
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