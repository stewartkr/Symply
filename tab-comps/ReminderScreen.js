import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Modal, Text, SafeAreaView} from 'react-native';
import ReminderCount from '../reminder/ReminderCount';
import ReminderList from '../reminder/ReminderList';
import ReminderAdd from '../reminder/ReminderAdd';
import TopBar from '../navigation/TopBar';

import {defaultOpenParams} from '../realm/DatabaseConfig';
import {GlobalStyle, GlobalColors} from '../assets/GlobalStyle';
const Realm = require('realm');

const reminderIsNotPassed = cron => {
  const today = new Date(Date.now());
  const parts = cron.split(' ');

  const cronHour = parseInt(parts[1], 10);
  const cronMinute = parseInt(parts[0], 10);

  return (
    cronHour > today.getHours() ||
    (cronHour === today.getHours() && cronMinute >= today.getMinutes())
  );
};

const reminderIsToday = cron => {
  const today = new Date(Date.now());
  const parts = cron.split(' ');

  const cronMonth = parts[3];
  const cronDate = parts[2];
  const cronDay = parts[4];

  return (
    (cronMonth === '*' ||
      parseInt(cronMonth, 10) === parseInt(today.getMonth(), 10) + 1) &&
    (cronDate === '*' ||
      parseInt(cronDate, 10) === parseInt(today.getDate(), 10)) &&
    (cronDay === '*' || parseInt(cronDay, 10) === parseInt(today.getDay())) &&
    reminderIsNotPassed(cron)
  );
};

export default function ReminderScreen() {
  const [currReminders, setReminders] = useState([]);
  const [realm, setRealm] = useState(null);
  const [modalVisible, setVisible] = useState(false);

  useEffect(() => {
    Realm.open(defaultOpenParams).then(r => {
      setRealm(r);
      populateReminders(r);
    });

    return () => {
      if (realm !== null && !realm.isClosed) {
        realm.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array used to ensure realm only opened once

  const populateReminders = r => {
    const reminders = r.objects('Reminder');
    setReminders(reminders);
  };

  const deleteReminder = reminder => {
    setReminders(prevReminders => {
      return prevReminders.filter(r => r.text !== reminder.text);
    });
    realm.write(() => {
      realm.delete(reminder);
    });
  };

  const addReminder = input => {
    let newReminder;
    realm.write(() => {
      newReminder = realm.create('Reminder', {
        text: input.text,
        schedule: input.schedule,
      });
    });
    // setReminders(prevReminders => {
    //   return [...prevReminders, newReminder];
    // });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={GlobalStyle.container}>
        <TopBar pageName="Reminders" />
        <Modal
          style={GlobalStyle.container}
          visible={modalVisible}
          animationType="slide">
          <ReminderAdd setVisible={setVisible} inputHandler={addReminder} />
        </Modal>
        <ReminderCount reminderList={currReminders} />
        <ReminderList
          reminderList={currReminders}
          deleteReminder={deleteReminder}
        />
        <TouchableOpacity
          style={GlobalStyle.addButton}
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={GlobalStyle.addButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export {reminderIsToday};
