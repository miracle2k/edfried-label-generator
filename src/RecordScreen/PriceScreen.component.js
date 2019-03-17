import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet} from 'react-native';
import {Touchable, Screen, Box, Text, Bold, Padding, Flex, Row, Column, Divider, Absolute} from '../components';

export class PriceScreen extends React.Component {
  static propTypes = {
    price: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    price: this.props.price,
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.price);
  };

  handleEdit = (price) => {
    this.setState({price});
  };

  handleBack = () => {
    this.props.onBack();
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  };

  render() {
    const {price} = this.state;
    return (
      <Column flex={Flex.FULL} justify={Flex.JUSTIFY.CENTER}>
        <Padding>
          <Box>
            <Text>Preis</Text>
            <TextInput
              value={price}
              onChangeText={this.handleEdit}
              style={styles.price}
              keyboardType={'numeric'}
              autoFocus={true}
            />
            <Divider/>
            <Touchable onPress={this.handleSubmit}>
              <Padding>
                <Text color={Text.COLOR.PRIMARY} size={Text.SIZE.SMALL}>OK</Text>
              </Padding>
            </Touchable>
          </Box>
        </Padding>
      </Column>
    );
  }
}

const styles = StyleSheet.create({
  price: {
    padding: 10,
    fontSize: fontSize,
    textAlign: 'center',
  },
});