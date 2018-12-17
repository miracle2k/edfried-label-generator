import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { primaryColor, backgroundColor, borderColor, textColor, subheaderColor, fontSize, shadow } from '../style';

export class Price extends React.Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
  };

  state = {
    text: ''
  };

  handleChangeText = (text) => {
    const price = parseFloat(text);
    if (!isNaN(price)) {
      this.props.onPriceChange(price);
      this.setState({ text });
    }
  };

  render() {
    const { price, onSubmit } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.subheader}>Price </Text>
            <TextInput
              value={text}
              onChangeText={this.handleChangeText}
              style={styles.price}
              keyboardType={'numeric'}
              autoFocus={true}
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
    borderColor: borderColor,
    backgroundColor: 'white',
    ...shadow,
  },
  cardContent: {
    padding: 20,
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
  },
  submit: {
    padding: 20,
    fontSize: fontSize,
    color: primaryColor,
    textAlign: 'center',
  },
});