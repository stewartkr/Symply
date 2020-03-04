import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import ReminderItem from './ReminderItem';
import {GlobalStyle, GlobalColors} from '../assets/GlobalStyle';

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 25,
    color: GlobalColors.softWhite,
    left: 20,
  },
});

const isNotPassed = cron => {
  const today = new Date(Date.now());
  const parts = cron.split(' ');

  const cronHour = parseInt(parts[1], 10);
  const cronMinute = parseInt(parts[0], 10);

  return (
    cronHour > today.getHours() ||
    (cronHour === today.getHours() && cronMinute >= today.getMinutes())
  );
};

const isToday = cron => {
  const today = new Date(Date.now());
  const parts = cron.split(' ');

  const cronMonth = parts[3];
  const cronDate = parts[2];

  return (
    (cronMonth === '*' || cronMonth === parseInt(today.getMonth(), 10) + 1) &&
    (cronDate === '*' || cronDate === parseInt(today.getDate(), 10)) &&
    isNotPassed(cron)
  );
};

const reminderItemList = (title, data) => {
  return (
    <View>
      <Text style={styles.listTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <ReminderItem reminder={item} />}
        keyExtractor={item => item.text}
      />
    </View>
  );
};

const filterReminders = reminders => {
  const today = [];
  const later = [];

  reminders.forEach(reminder => {
    if (isToday(reminder.schedule)) {
      today.push(reminder);
    } else {
      later.push(reminder);
    }
  });

  return (
    <View>
      {today.length > 0 ? reminderItemList('Today', today) : null}
      {later.length > 0 ? reminderItemList('Later', later) : null}
    </View>
  );
};

export default function ReminderList({reminderList}) {
  return (
    <View style={[GlobalStyle.container, {flex: 2}]}>
      {filterReminders(reminderList)}
    </View>
  );
}
