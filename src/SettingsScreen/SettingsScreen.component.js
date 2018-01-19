import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';
import { DocumentPicker } from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import yaml from 'js-yaml';
import Toast from 'react-native-simple-toast';
import { primaryColor, backgroundColor, borderColor, textColor, subheaderColor, fontSize, shadow } from '../style';
import { toCsv } from '../records';

export class SettingsScreenComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    rootAnswers: PropTypes.array.isRequired,
    rootAnswer: PropTypes.any.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    records: PropTypes.array.isRequired,
    setRootAnswers: PropTypes.func.isRequired,
    setSelectedIndex: PropTypes.func.isRequired,
    eraseRecords: PropTypes.func.isRequired,
  };

  handleImport = () => {
    DocumentPicker.show({
      filetype: ['*/*'],
    }, (error, result) => {
      if (result) {
        RNFetchBlob.fs.readFile(result.uri, 'utf8')
        .then((text) => yaml.safeLoad(text))
        .then((rootAnswers) => {
          this.props.setRootAnswers(rootAnswers);
          Toast.show('Imported questions successfully');
        })
        .catch((error) => {
          Toast.show('An error has occured');
        });
      }
    });
  };

  handleExport = () => {
    const filename = `${new Date().getTime()}`;
    const path = RNFetchBlob.fs.dirs.DownloadDir + '/ProductLabels-' + filename + '.csv';
    const csv = toCsv(this.props.records);
    RNFetchBlob.fs.writeFile(path, csv, 'utf8')
    .then((success) => {
      Toast.show(`Exported to: ${path}`);
      this.props.eraseRecords();
    })
    .catch((error) => {
      Toast.show('An error has occured');
    });
  };

  render() {
    const { selectedIndex, rootAnswers, records, setSelectedIndex } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.subheader}>Questions</Text>
            <Picker selectedValue={selectedIndex} onValueChange={setSelectedIndex}>
              {rootAnswers.map((rootAnswer, i) => (
                <Picker.Item key={i} label={rootAnswer.Name} value={i}/>
              ))}
            </Picker>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={this.handleImport}>
              <Text style={styles.cardAction}>IMPORT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.subheader}>Records</Text>
            <Text style={styles.row}>Records: {records.length}</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={this.handleExport}>
              <Text style={styles.cardAction}>EXPORT</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  card: {
    minWidth: 300,
    marginBottom: 30,
    borderRadius: 2,
    backgroundColor: 'white',
    ...shadow,
  },
  subheader: {
    fontSize: fontSize,
    color: subheaderColor,
  },
  row: {
    fontSize: fontSize,
  },
  cardContent: {
    padding: 20,
  },
  cardAction: {
    borderTopWidth: 1,
    borderTopColor: borderColor,
    padding: 20,
    fontSize: fontSize,
    color: primaryColor,
    textAlign: 'center',
  },
});
