import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar';
import {GlobalColors} from '../assets/GlobalStyle';
import ApppointmentForm from '../form_components/AppointmentForm';
import { defaultOpenParams, allSchemas } from '../realm/DatabaseConfig';

export function AppointmentScreen() {

  const [modalOpen, setModalOpen] = useState(false);

  const [appointments, setAppointment] = useState([
    {text:'Physical Therapy', date:'Wed', time:'4:20',key:1},
    {text:'Pediatrist', date:'Mon',time:'6:09', key:2},
    {text:'Chiropractor', date:'Sat',time:'3:33', key:3}
  ]);

  //temporary while the db is yet to be pulling from
  const addAppoint = (appointments) => {
    appointments.key = Math.random().toString();
    setAppointment((nextAppointment) => {
      return [appointments, ...nextAppointment];
    })
    setModalOpen(false);
  }


  return (
    <View style={{flex: 1, backgroundColor: GlobalColors.backgroundColor}}>
      <TopBar pageName='Appointments' />
      <Modal 
        visible={modalOpen} 
        animationType='slide' 
      >
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => { setModalOpen(false) }}
            style={{ marginTop:50, alignSelf:'flex-end'}}
          >
            <Text>Back</Text>
          </TouchableOpacity>
          <ApppointmentForm addAppoint={addAppoint}/>
        </View>
      </Modal>
      <ListTemplate listItems={appointments}/>
      <TouchableOpacity 
        onPress={()=>{setModalOpen(true)}}
      >
        <Text>Add Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}
