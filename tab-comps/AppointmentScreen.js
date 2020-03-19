import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Modal, SafeAreaView} from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';
import ApppointmentForm from '../form_components/AppointmentForm';

import {defaultOpenParams} from '../realm/DatabaseConfig';

const Realm = require('realm');

export function AppointmentScreen() {
  const [appointments, setAppointments] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [realm, setRealm] = useState(null);

  const listener = r => {
    let snap = r.objects('Appointment').snapshot();
    let array = Object.keys(snap).map(key => snap[key]);
    if (appointments !== array) {
      console.log('Update Appointments');
      setAppointments(array);
    }
  };

  const listenerName = 'change';

  useEffect(() => {
    Realm.open(defaultOpenParams).then(realm => {
      setRealm(realm);
      let snap = realm.objects('Appointment').snapshot();
      let array = Object.keys(snap).map(key => snap[key]);
      setAppointments(array);
      realm.addListener(listenerName, listener);
    });

    return () => {
      if (realm !== null && !realm.isClosed) {
        realm.removeListener(listenerName, listener);
        console.log('closed realm');
        realm.close();
      }
    };
  }, []);

  const addAppoint = appointments => {
    realm.write(() => {
      newTreatment = realm.create('Appointment', {
        provider: appointments.name,
        time: appointments.time,
      });
    });
    setModalOpen(false);
  };

  // return an array, index 0 is Name, index 1 is secondary info
  const textExtractor = appointment => {
    const weekday = appointment.time.getDay();
    const date = appointment.time.getDate();
    const month = appointment.time.getMonth();

    let weekdayName = '';
    let monthName = '';

    switch (weekday) {
      case 0:
        weekdayName = 'Sunday';
        break;
      case 1:
        weekdayName = 'Monday';
        break;
      case 2:
        weekdayName = 'Tuesday';
        break;
      case 3:
        weekdayName = 'Wednesday';
        break;
      case 4:
        weekdayName = 'Thursday';
        break;
      case 5:
        weekdayName = 'Friday';
        break;
      case 6:
        weekdayName = 'Saturday';
        break;
    }

    switch (month) {
      case 0:
        monthName = 'Jan';
        break;
      case 1:
        monthName = 'Feb';
        break;
      case 2:
        monthName = 'Mar';
        break;
      case 3:
        monthName = 'Apr';
        break;
      case 4:
        monthName = 'May';
        break;
      case 5:
        monthName = 'Jun';
        break;
      case 6:
        monthName = 'Jul';
        break;
      case 7:
        monthName = 'Aug';
        break;
      case 8:
        monthName = 'Sep';
        break;
      case 9:
        monthName = 'Oct';
        break;
      case 10:
        monthName = 'Nov';
        break;
      case 11:
        monthName = 'Dec';
        break;
    }

    let primary = `${weekdayName}, ${monthName} ${date}`;
    let secondary = `${appointment.provider.firstName} ${
      appointment.provider.lastName
    }`;
    return [primary, secondary];
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: GlobalColors.backgroundColor}}>
        <TopBar pageName="Appointments" />
        <Modal visible={modalOpen} animationType="slide">
          <View style={GlobalStyle.container}>
            <TouchableOpacity
              onPress={() => {
                setModalOpen(false);
              }}
              style={GlobalStyle.backButton}>
              <Text style={{textAlign: 'center', fontSize: 20}}>Back</Text>
            </TouchableOpacity>
            <ApppointmentForm addAppoint={addAppoint} />
          </View>
        </Modal>
        <ListTemplate listItems={appointments} textExtractor={textExtractor} />
        <TouchableOpacity
          onPress={() => {
            setModalOpen(true);
          }}
          style={GlobalStyle.addButton}>
          <Text style={GlobalStyle.addButtonText}>Add Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
