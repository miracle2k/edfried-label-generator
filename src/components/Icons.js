import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Box, Text, Bold, Padding, Flex, Row, Column, Divider, Absolute, Touchable} from '../components';
import {primaryColor, subheaderColor, backgroundColor, borderColor, grayedColor, textColor, fontSize, shadow} from '../style';

export const SettingsIcon = (props) => (
	<Icon name="settings" size={20} color={textColor} {...props}/>
);

export const EditIcon = (props) => (
	<Icon name="edit" size={20} color={textColor} {...props}/>
);

export const BackIcon = (props) => (
	<Icon name="arrow-back" size={20} color={textColor} {...props}/>
);