import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar'
import {GlobalColors} from '../assets/GlobalStyle';

// TODO: Why... Update this to pull symptoms?
export function LogScreen() {

  const logs = [
    {text:'nausea', key:'1'},
    {text: 'upset stomach', key: '2'},
    {text: 'headache', key: '3'}
  ];
  return (
    <View style={{flex: 1, backgroundColor:GlobalColors.backgroundColor}}>
      <TopBar pageName='Log' />
      <ListTemplate listItems={logs}/>
    </View>
  );
}
