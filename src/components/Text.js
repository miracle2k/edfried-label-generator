import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text as RNText} from 'react-native';
import {fontSizes, colors} from '../style';

const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const WEIGHT = {
  NORMAL: 'normal',
  BOLD: 'bold',
};

const ALIGN = {
  CENTER: 'center',
  LEFT: 'left',
  RIGHT: 'right',
  JUSTIFY: 'justify',
};

const COLOR = {
  TEXT: 'text',
  PRIMARY: 'primary',
  GRAYED: 'grayed',
  SUBHEADER: 'subheader',
};

export class Text extends React.PureComponent {
  static SIZE = SIZE;
  static WEIGHT = WEIGHT;
  static ALIGN = ALIGN;
  static COLOR = COLOR;

  static propTypes = {
    size: PropTypes.string,
    weight: PropTypes.string,
    align: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.any,
    styles: PropTypes.object,
  };

  render() {
    const {size, weight, align, color, children, styles} = this.props;
    return (
      <RNText style={[textStyles.text, sizeStyles[size], weightStyles[weight], alignStyles[align], colorStyles[color], styles]}>
        {children}
      </RNText>
    );
  }
}

const textStyles = StyleSheet.create({
  text: {
    fontSize: fontSizes.medium,
    fontWeight: 'normal',
    color: colors.text,
  },
});

const sizeStyles = StyleSheet.create({
  [SIZE.SMALL]: {
    fontSize: fontSizes.small,
  },
  [SIZE.MEDIUM]: {
    fontSize: fontSizes.medium,
  },
  [SIZE.LARGE]: {
    fontSize: fontSizes.large,
  },
});

const weightStyles = StyleSheet.create({
  [WEIGHT.NORMAL]: {
    fontWeight: 'normal',
  },
  [WEIGHT.BOLD]: {
    fontWeight: 'bold',
  },
});

const alignStyles = StyleSheet.create({
  [ALIGN.CENTER]: {
    textAlign: 'center',
  },
  [ALIGN.LEFT]: {
    textAlign: 'left',
  },
  [ALIGN.RIGHT]: {
    textAlign: 'right',
  },
  [ALIGN.JUSTIFY]: {
    textAlign: 'justify',
  },
});

const colorStyles = StyleSheet.create({
  [COLOR.TEXT]: {
    color: colors.text,
  },
  [COLOR.GRAYED]: {
    color: colors.grayed,
  },
  [COLOR.PRIMARY]: {
    color: colors.primary,
  },
  [COLOR.SUBHEADER]: {
    color: colors.subheader,
  },
});

export const Bold = (props) => <Text weight={WEIGHT.BOLD} {...props}/>;

export const Subheader = (props) => <Text color={COLOR.SUBHEADER} {...props}/>;

