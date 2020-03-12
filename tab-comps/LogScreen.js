import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Modal, TouchableOpacity, Text } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar';
import { GlobalColors, GlobalStyle } from '../assets/GlobalStyle';

import { defaultOpenParams } from '../realm/DatabaseConfig';
import SymptomForm from '../form_components/SymptomForm'

const Realm = require('realm');


export function LogScreen() {

  const [symptoms, setSymptoms] = useState([]);
  // TODO: Add symptomform :) (sb)
  const [modalOpen, setModalOpen] = useState(false);
  const [realm, setRealm] = useState(null);

  const listener = (r) => {
    let snap = r.objects('Symptom').snapshot();
    let array = Object.keys(snap).map(key => snap[key]);
    if(symptoms != array){
      console.log('Update Symptoms');
      setSymptoms(array);
    }
  }

  const listenerName = 'change';

  useEffect(() => {
    Realm.open(defaultOpenParams).then(realm => {
        setRealm(realm);
        let snap = realm.objects('Symptom').snapshot();
        let array = Object.keys(snap).map(key => snap[key]);
        setSymptoms(array);
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

  const addSymptom = (symptoms) => {
    realm.write(() => {
      newTreatment = realm.create('Symptom', {
        name: symptoms.name
      });
    });
    setModalOpen(false);
  }

  // return an array, index 0 is Name, index 1 is secondary info
  const textExtractor = (symptoms) => {
    let primary = symptoms.name;
    let secondary = '';
    return [primary, secondary];
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1, backgroundColor:GlobalColors.backgroundColor}}>
        <TopBar pageName='Log' />
        <Modal
          visible={modalOpen}
          animationType='slide'
        >
          <View style={GlobalStyle.container}>
            <TouchableOpacity
              onPress={() => { setModalOpen(false) }}
              style={GlobalStyle.backButton}
            >
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Back</Text>
            </TouchableOpacity>
            <SymptomForm addSymptom={addSymptom} />
          </View>
        </Modal>
        <ListTemplate listItems={symptoms} textExtractor={textExtractor}/>
        <TouchableOpacity
          onPress={() => { setModalOpen(true) }}
          style={GlobalStyle.addButton}
        >
          <Text style={GlobalStyle.addButtonText}>Add Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
