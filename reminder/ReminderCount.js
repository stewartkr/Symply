import React from 'react';
import {View, Text} from 'react-native';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

export default function ReminderCount(props) {
  return (
    <View>
      <Text>
        I'm a ReminderCount Component! There are {props.countToday} reminders
        today.
      </Text>
    </View>
  );
}
