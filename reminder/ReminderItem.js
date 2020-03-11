import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

import {reminderIsToday} from '../tab-comps/ReminderScreen';

const styles = StyleSheet.create({
  reminderContainer: {
    paddingBottom: 5,
    alignItems: 'center',
  },
  reminderBox: {
    backgroundColor: GlobalColors.softWhite,
    borderRadius: 20,
    width: '96%',
  },
  reminderFont: {
    color: GlobalColors.fontColor,
  },
  reminderTasks: {
    left: 15,
    fontSize: 25,
  },
  reminderSchedule: {
    left: 15,
    fontSize: 20,
  },
});

const dayOfWeek = date => {
  switch (date) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
};

const dayIfNotToday = cron => {
  const today = new Date(Date.now());
  const parts = cron.split(' ');

  if (!reminderIsToday(cron)) {
    if (parts[2] === '*' && parts[3] === '*' && parts[4] === '*') {
      return `${dayOfWeek(parseInt(today.getDay(), 10) + 1)}, `;
    }
    return `${dayOfWeek(parseInt(parts[4], 10))}, `;
  }
  return 'Today, ';
};

const cronToString = cron => {
  const parts = cron.split(' ');
  const cronHour = parseInt(parts[1], 10);
  const cronMinute = parseInt(parts[0], 10);

  const period = cronHour < 12 ? 'am' : 'pm';
  const formattedHour =
    cronHour === 0
      ? '12'
      : cronHour > 12
      ? (cronHour % 12).toString()
      : cronHour.toString();
  const formattedMinute =
    cronMinute < 10
      ? cronMinute.toString().padStart(2, '0')
      : cronMinute.toString();

  return `${formattedHour}:${formattedMinute}${period}`;
};

const cronRepeats = cron => {
  const parts = cron.split(' ');

  return '\u21BB';
};

const taskNum = (taskText, taskLen) => {
  if (taskLen === 1) {
    return `${taskText}`;
  }
  return `${taskText}`;
};

export default function ReminderItem({reminder, deleteHandler}) {
  return (
    <View style={[GlobalStyle.container, styles.reminderContainer]}>
      <TouchableOpacity
        style={styles.reminderBox}
        onPress={() => {
          deleteHandler(reminder);
        }}>
        <Text style={[styles.reminderFont, styles.reminderTasks]}>
          {taskNum(reminder.text, reminder.tasks.length)}
        </Text>
        <Text style={[styles.reminderFont, styles.reminderSchedule]}>
          {dayIfNotToday(reminder.schedule)}
          {cronToString(reminder.schedule)}
          {cronRepeats(reminder.schedule)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
