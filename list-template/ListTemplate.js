import * as React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

import List from './List'
import Dropdown from './Dropdown'

export default function ListTemplate({listItems}) {

  return (
    <View style={{ flex: 1}}>
      <TextInput
        placeholder='Search...'
      />
      <View style={styles.flexRow}>
        <Dropdown description='Tags' />
        <Dropdown description='Sort by' />
      </View>
      <List listItems={listItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row'
  }
})
