import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

const FULL = 'full-flex';

const NONE = 'none-flex';

const DIRECTION = {
  ROW: 'row',
  COLUMN: 'column',
};

const JUSTIFY = {
  START: 'justify-start',
  END: 'justify-end',
  CENTER: 'justify-center',
  SPACE_BETWEEN: 'justify-space-between',
  SPACE_AROUND: 'justify-space-around',
  SPACE_EVENLY: 'justify-space-evenly',
};

const ALIGN = {
  START: 'align-start',
  END: 'align-end',
  CENTER: 'align-center',
  STRETCH: 'align-stretch',
  SPACE_BETWEEN: 'align-space-between',
  SPACE_AROUND: 'align-space-around',
};

export class Flex extends React.PureComponent {
  static FULL = FULL;
  static NONE = NONE;
  static DIRECTION = DIRECTION;
  static JUSTIFY = JUSTIFY;
  static ALIGN = ALIGN;

  static propTypes = {
    flex: PropTypes.string,
    direction: PropTypes.string,
    justify: PropTypes.string,
    align: PropTypes.string,
    children: PropTypes.any,
  };

  render() {
    const {children, flex, direction, justify, align} = this.props;
    return (
      <View style={[styles.container, flexStyles[flex], directionStyles[direction], justifyStyles[justify], alignStyles[align]]}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
});

const flexStyles = StyleSheet.create({
  [FULL]: {
    flex: 1,
  },
  [NONE]: {
    flex: 0,
  },
});

const directionStyles = StyleSheet.create({
  [DIRECTION.ROW]: {
    flexDirection: 'row',
  },
  [DIRECTION.COLUMN]: {
    flexDirection: 'column',
  },
});

const justifyStyles = StyleSheet.create({
  [JUSTIFY.START]: {
    justifyContent: 'flex-start',
  },
  [JUSTIFY.END]: {
    justifyContent: 'flex-end',
  },
  [JUSTIFY.CENTER]: {
    justifyContent: 'center',
  },
  [JUSTIFY.SPACE_BETWEEN]: {
    justifyContent: 'space-between',
  },
  [JUSTIFY.SPACE_AROUND]: {
    justifyContent: 'space-around',
  },
  [JUSTIFY.SPACE_EVENLY]: {
    justifyContent: 'space-evenly',
  },
});

const alignStyles = StyleSheet.create({
  [ALIGN.START]: {
    alignContent: 'flex-start',
  },
  [ALIGN.END]: {
    alignContent: 'flex-end',
  },
  [ALIGN.CENTER]: {
    alignContent: 'center',
  },
  [ALIGN.STRETCH]: {
    alignContent: 'stretch',
  },
  [ALIGN.SPACE_BETWEEN]: {
    alignContent: 'space-between',
  },
  [ALIGN.SPACE_AROUND]: {
    alignContent: 'space-around',
  },
});

export const Row = (props) => <Flex direction={DIRECTION.ROW} {...props}/>;

export const Column = (props) => <Flex direction={DIRECTION.COLUMN} {...props}/>;