import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar';
import {GlobalColors} from '../assets/GlobalStyle';
import ApppointmentForm from '../form_components/AppointmentForm';

import { defaultOpenParams, allSchemas } from '../realm/DatabaseConfig';

const Realm = require('realm');

export function AppointmentScreen() {

  const [appointments, setAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [realm, setRealm] = useState(null)
  

  useEffect(() => {
    Realm.open(defaultOpenParams).then(realm => {
      console.log('opened realm in Treatments');
      setRealm(realm);
      setAppointment(realm.objects('Appointment'));
    });

    return () => {
      if (realm !== null && !realm.isClosed) {
        console.log('closed realm');
        realm.close();
      }
    };
  }, []);

  //temporary while the db is yet to be pulling from
  const addAppoint = (appointments) => {
    console.log(treatments.name);
    const dosageVal = parseInt(treatments.dose, 10);
    realm.write(() => {
      newTreatment = realm.create('Treatment', {
        provider: appointments.name,
        time: appointments.time
      });
    });
    setModalOpen(false);
  }

  const goBack = () =>{
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
            style={styles.backButton}
          >
            <Text style={{ textAlign: 'center', fontSize: 20}}>Back</Text>
          </TouchableOpacity>
          <ApppointmentForm addAppoint={addAppoint}/>
        </View>
      </Modal>
      <ListTemplate listItems={appointments}/>
      <TouchableOpacity 
        onPress={()=>{setModalOpen(true)}}
        style={styles.addButton}
      >
        <Text>Add Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'white',
    padding: 10,
    width: 135,
    marginBottom:10,
    left:10,
    borderRadius:10
  },
  backButton:{
    marginTop: 50, 
    alignSelf: 'flex-end',
    width:55,
    height:35,
    paddingTop:5,
    fontSize:100,
    borderRadius:5,
    right:1
  }
});
