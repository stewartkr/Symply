import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ReminderCount from '../reminder/ReminderCount';
import ReminderList from '../reminder/ReminderList';

import {defaultOpenParams, allSchemas} from '../realm/DatabaseConfig';
const Realm = require('realm');

export function ReminderScreen() {
  const [currReminders, setReminders] = useState([]);
  const [realmState, setRealm] = useState(null);

  useEffect(() => {
    Realm.open(defaultOpenParams).then(r => {
      setRealm(r);
      populateReminders(r);
    });

    return () => {
      if (realmState !== null && !realmState.isClosed) {
        realmState.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array used to ensure realm only opened once

  function populateReminders(r) {
    const reminders = r.objects('Reminder');
    setReminders(reminders);
  }

  return (
    <View>
      <ReminderCount countToday={currReminders.length} />
      <ReminderList reminderList={currReminders} />
    </View>
  );
}
