import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar';
import { GlobalColors, GlobalStyle } from '../assets/GlobalStyle';
import ApppointmentForm from '../form_components/AppointmentForm';

import { defaultOpenParams } from '../realm/DatabaseConfig';

const Realm = require('realm');

export function AppointmentScreen() {

  const [appointments, setAppointments] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [realm, setRealm] = useState(null)
  
  const listener = (r) => {
    let snap = r.objects('Appointment').snapshot();
    let array = Object.keys(snap).map(key => snap[key]);
    if(appointments != array){
      console.log('Update Appointments');
      setAppointments(array);
    }
  }

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

  const addAppoint = (appointments) => {
    realm.write(() => {
      newTreatment = realm.create('Appointment', {
        provider: appointments.name,
        time: appointments.time
      });
    });
    setModalOpen(false);
  }

  // return an array, index 0 is Name, index 1 is secondary info
  const textExtractor = (appointment) => {
    let primary = appointment.time.toString();
    let secondary = '';
    secondary = appointment.provider;
    return [primary, secondary];
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex: 1, backgroundColor: GlobalColors.backgroundColor}}>
        <TopBar pageName='Appointments' />
        <Modal 
          visible={modalOpen} 
          animationType='slide' 
        >
          <View style={GlobalStyle.container}>
            <TouchableOpacity
              onPress={() => { setModalOpen(false) }}
              style={GlobalStyle.backButton}
            >
              <Text style={{ textAlign: 'center', fontSize: 20}}>Back</Text>
            </TouchableOpacity>
            <ApppointmentForm addAppoint={addAppoint}/>
          </View>
        </Modal>
        <ListTemplate listItems={appointments} textExtractor={textExtractor}/>
        <TouchableOpacity 
          onPress={()=>{setModalOpen(true)}}
          style={GlobalStyle.addButton}
        >
          <Text style={GlobalStyle.addButtonText}>Add Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
