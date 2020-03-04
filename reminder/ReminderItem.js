import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

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

const dayIfNotToday = cron => {
  const today = new Date(Date.now());
  const parts = cron.split(' ');

  const cronMonth = parts[3];
  const cronDate = parts[2];

  if (
    cronMonth !== '*' &&
    cronMonth !== parseInt(today.getMonth(), 10) + 1 &&
    (cronDate !== '*' && cronDate !== parseInt(today.getDate(), 10))
  ) {
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

    return `${dayOfWeek(today.getDay())}, `;
  }
  return '';
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
    return `${taskText} (${taskLen} task)`;
  }
  return `${taskText} (${taskLen} tasks)`;
};

export default function ReminderItem({reminder}) {
  return (
    <View style={[GlobalStyle.container, styles.reminderContainer]}>
      <View style={styles.reminderBox}>
        <Text style={[styles.reminderFont, styles.reminderTasks]}>
          {taskNum(reminder.text, reminder.tasks.length)}
        </Text>
        <Text style={[styles.reminderFont, styles.reminderSchedule]}>
          {dayIfNotToday(reminder.schedule)}
          {cronToString(reminder.schedule)}
          {cronRepeats(reminder.schedule)}
        </Text>
      </View>
    </View>
  );
}
