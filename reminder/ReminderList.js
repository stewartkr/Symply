import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import ReminderItem from './ReminderItem';
import {GlobalStyle, GlobalColors} from '../assets/GlobalStyle';

import {reminderIsToday} from '../tab-comps/ReminderScreen';

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 25,
    color: GlobalColors.softWhite,
    left: 20,
  },
});

const reminderItemList = (title, data, deleteReminder) => {
  return (
    <View>
      <Text style={styles.listTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <ReminderItem reminder={item} deleteHandler={deleteReminder}/>}
        keyExtractor={item => item.text}
      />
    </View>
  );
};

const filterReminders = (reminders, deleteReminder) => {
  const today = reminders.filter(reminder =>
    reminderIsToday(reminder.schedule),
  );
  const later = reminders.filter(
    reminder => !reminderIsToday(reminder.schedule),
  );

  return (
    <View>
      {today.length > 0 ? reminderItemList('Today', today, deleteReminder) : null}
      {later.length > 0 ? reminderItemList('Later', later, deleteReminder) : null}
    </View>
  );
};

export default function ReminderList({reminderList, deleteReminder}) {
  return (
    <View style={[GlobalStyle.container, {flex: 2}]}>
      {filterReminders(reminderList, deleteReminder)}
    </View>
  );
}
