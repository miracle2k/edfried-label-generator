import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { primaryColor, backgroundColor, borderColor, textColor, subheaderColor, fontSize } from '../style';

export class Price extends React.Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
  };

  handleChangeText = (text) => {
    const price = parseFloat(text);
    if (!isNaN(price)) {
      this.props.onChange(price);
    }
  };

  render() {
    const { price, onSubmit } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.subheader}>Price </Text>
            <TextInput
              value={price + ''}
              onChangeText={this.handleChangeText}
              keyboardType={'numeric'}
              style={styles.price}
            />
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.submit}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: fontSize,
  },
  cardContent: {
    padding: 20,
    fontSize: fontSize,
  },
  subheader: {
    fontSize: fontSize,
    color: subheaderColor,
  },
  price: {
    padding: 10,
    fontSize: fontSize,
    textAlign: 'center',
  },
  cardActions: {
    borderTopWidth: 1,
    borderTopColor: borderColor,
    fontSize: fontSize,
  },
  submit: {
    padding: 20,
    fontSize: fontSize,
    color: primaryColor,
    textAlign: 'center',
  },
});