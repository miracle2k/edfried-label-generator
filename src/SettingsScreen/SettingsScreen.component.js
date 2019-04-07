import React from 'react';
import PropTypes from 'prop-types';
import {Picker} from 'react-native';
import {Box, Text, Bold, Padding, Flex, Row, Column, Divider, Absolute, Touchable} from '../components';
import {DocumentPicker} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import yaml from 'js-yaml';
import Toast from 'react-native-simple-toast';
import {primaryColor, backgroundColor, borderColor, textColor, subheaderColor, fontSize, shadow} from '../style';
import {toCsv} from '../data';

export class SettingsScreenComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    questionaries: PropTypes.array.isRequired,
    questionary: PropTypes.any.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    records: PropTypes.object.isRequired,
    setQuestionaries: PropTypes.func.isRequired,
    setQuestionary: PropTypes.func.isRequired,
    eraseRecords: PropTypes.func.isRequired,
  };

  handleImport = () => {
    DocumentPicker.show({
      filetype: ['*/*'],
    }, (error, result) => {
      if (result) {
        RNFetchBlob.fs.readFile(result.uri, 'utf8')
          .then((text) => yaml.safeLoad(text))
          .then((questionaries) => {
            this.props.setQuestionaries(questionaries);
            Toast.show('Imported questions successfully');
          })
          .catch((error) => {
            Toast.show('An error has occured');
          });
      }
    });
  };

  handleExport = (e, doReset) => {
    const filename = `${new Date().getTime()}`;
    const path = RNFetchBlob.fs.dirs.DownloadDir + '/ProductLabels-' + filename + '.csv';
    const csv = toCsv(this.props.records);
    RNFetchBlob.fs.writeFile(path, csv, 'utf8')
      .then((success) => {
        Toast.show(`Exported to: ${path}`);
        if (doReset) {
          this.props.eraseRecords();
        }
      })
      .catch((error) => {
        Toast.show('An error has occured');
      });
  };

  handleExportAndReset = (e) => {
    this.handleExport(e, true);
  };

  handleSelect = (index) => {
    this.props.setQuestionary(index);
  };

  render() {
    const {selectedIndex, questionaries, questionary, records, setQuestionary} = this.props;

    return (
      <Column flex={Flex.FULL} justify={Flex.JUSTIFY.CENTER}>
        <Padding>
          <Box>
            <Padding>
              <Text color={Text.COLOR.SUBHEADER} size={Text.SIZE.SMALL}>Questions</Text>
              <Picker selectedValue={selectedIndex} onValueChange={this.handleSelect}>
                {questionaries.map((questionary, i) => (
                  <Picker.Item key={i} label={questionary.Name} value={i}/>
                ))}
              </Picker>
            </Padding>
            <Divider/>
            <Touchable onPress={this.handleImport}>
              <Padding>
                <Text align={Text.ALIGN.CENTER} color={Text.COLOR.PRIMARY}>IMPORT</Text>
              </Padding>
            </Touchable>
          </Box>
        </Padding>
        <Padding>
          <Box>
            <Padding>
              <Text color={Text.COLOR.SUBHEADER} size={Text.SIZE.SMALL}>Records</Text>
              <Text>Records: {Object.keys(records).length}</Text>
            </Padding>
            <Divider/>
            <Touchable onPress={this.handleExport}>
              <Padding>
                <Text align={Text.ALIGN.CENTER} color={Text.COLOR.PRIMARY}>EXPORT</Text>
              </Padding>
            </Touchable>
            <Divider/>
            <Touchable onPress={this.handleExportAndReset}>
              <Padding>
                <Text align={Text.ALIGN.CENTER} color={Text.COLOR.PRIMARY}>EXPORT AND RESET</Text>
              </Padding>
            </Touchable>
          </Box>
        </Padding>
      </Column>
    );
  }
}
