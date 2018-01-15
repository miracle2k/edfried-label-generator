import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export class Price extends React.Component {
  handleChangeText = (text) => {
    const price = parseFloat(text);
    if (!isNaN(price)) {
      this.props.onPriceChange(price);
    }
  };

  render() {
    const { price, onSubmit } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          value={price + ''}
          onChangeText={this.handleChangeText}
          keyboardType={'numeric'}
        />
        <Button title="OK" onPress={onSubmit}/>
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