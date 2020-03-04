import React from 'react';
import {View, Text} from 'react-native';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

import {reminderIsToday} from '../tab-comps/ReminderScreen';

const countText = reminderLen => {
  if (reminderLen === 1) {
    return 'reminder coming up today';
  }
  return 'reminders coming up today';
};

export default function ReminderCount({reminderList}) {
  const remindersToday = reminderList.filter(reminder =>
    reminderIsToday(reminder.schedule),
  );

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
        {remindersToday.length}
      </Text>
      <Text
        style={[
          GlobalStyle.titleText,
          {color: GlobalColors.softWhite, fontSize: 35},
        ]}>
        {countText(remindersToday.length)}
      </Text>
    </View>
  );
}
