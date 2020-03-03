import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

export default function ReminderItem(props) {
  return (
    <View>
      <Text>
        I'm a ReminderItem Component! I have {props.reminder.tasks.length}{' '}
        tasks!
      </Text>
    </View>
  );
}
