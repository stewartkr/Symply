import React from 'react';
import {View, Text, FlatList} from 'react-native';
import ReminderItem from './ReminderItem';
import {GlobalStyle, GlobalColors} from '../assets/GlobalStyle';

export default function ReminderList(props) {
  return (
    <View>
      <Text>
        I'm a ReminderList Component! I have {props.reminderList.length}{' '}
        ReminderItems in me.
      </Text>
      <FlatList
        data={props.reminderList}
        renderItem={({item}) => <ReminderItem reminder={item} />}
        keyExtractor={item => item.text}
      />
    </View>
  );
}
