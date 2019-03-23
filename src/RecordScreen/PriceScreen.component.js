import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, BackHandler, StyleSheet} from 'react-native';
import {Touchable, Screen, Box, Text, Subheader, Bold, Padding, Flex, Row, Column, Divider, Absolute, BackIcon} from '../components';
import {fontSize} from '../style';

export class PriceScreen extends React.Component {
  static propTypes = {
    price: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  static navigationOptions = ({navigation}) => ({
    headerLeft: <Touchable onPress={navigation.getParam('onBack')}><Padding><BackIcon/></Padding></Touchable>,
  });

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
    return true;
  };

  componentDidMount() {
    this.props.navigation.setParams({onBack: this.handleBack});
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
            <Padding>
              <Subheader>Preis</Subheader>
            </Padding>
            <TextInput
              value={price}
              onChangeText={this.handleEdit}
              style={styles.price}
              keyboardType={'numeric'}
              autoFocus={true}
            />
            <Divider/>
            <Touchable onPress={this.handleSubmit}>
              <Padding double>
                <Text color={Text.COLOR.PRIMARY} size={Text.SIZE.SMALL} align={Text.ALIGN.CENTER}>OK</Text>
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