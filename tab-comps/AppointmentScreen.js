import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar';

export function AppointmentScreen() {

  const appointments = [
    {text:'Dr. Doolittle, Friday, 3 p.m.', key:'1'},
    {text: 'Dr. Lecter, Saturday, 12 a.m.', key: '2'},
    {text: 'Dr. Kevorkian, Sunday, 6 p.m.', key: '3'}
  ];

  return (
    <View style={{flex: 1}}>
      <TopBar pageName='Appointments' />
      <ListTemplate listItems={appointments}/>
    </View>
  );
}
