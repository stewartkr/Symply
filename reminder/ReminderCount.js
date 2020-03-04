import React from 'react';
import {View, Text} from 'react-native';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

export default function ReminderCount({countToday}) {
  const reminderNum = reminderLen => {
    if (reminderLen === 1) {
      return 'reminder coming up today';
    }
    return 'reminders coming up today';
  };

  return (
    <View style={[GlobalStyle.container, {top: 0}]}>
      <Text
        style={[
          GlobalStyle.titleText,
          {color: GlobalColors.softWhite, fontSize: 35},
        ]}>
        You have...
      </Text>
      <Text
        style={[
          GlobalStyle.titleText,
          {fontWeight: 'bold', color: GlobalColors.softWhite, fontSize: 40},
        ]}>
        {countToday}
      </Text>
      <Text
        style={[
          GlobalStyle.titleText,
          {color: GlobalColors.softWhite, fontSize: 35},
        ]}>
        {reminderNum(countToday)}
      </Text>
    </View>
  );
}
