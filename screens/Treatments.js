import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Modal, TouchableOpacity } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TreatmentForm from '../form_components/TreatmentForm';

import { defaultOpenParams } from '../realm/DatabaseConfig';
import { GlobalStyle } from '../assets/GlobalStyle';

const Realm = require('realm');

export default function Treatments() {

    const [treatments, setTreatments] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [realm, setRealm] = useState(null);

    const listener = (r) => {
      let snap = r.objects('Treatment').snapshot();
      let array = Object.keys(snap).map(key => snap[key]);
      if(treatments != array){
        console.log('Update Treatments');
        setTreatments(array);
      }
    }

    const listenerName = 'change';

    useEffect(() => {
        Realm.open(defaultOpenParams).then(realm => {
            setRealm(realm);
            let snap = realm.objects('Treatment').snapshot();
            let array = Object.keys(snap).map(key => snap[key]);
            setTreatments(array);
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
    
    const addTreatments = (treatments) => {
        console.log(treatments.name);
        const dosageVal = parseInt(treatments.dose,10);
        realm.write(() => {
            const newTreatment = realm.create('Treatment', {
              name: treatments.name, 
              medication: treatments.medication,
              dose: dosageVal, 
              doseUnit: treatments.doseUnit, 
            });
        });
        setModalOpen(false);
    }

    // return an array, index 0 is Name, index 1 is secondary info
    const textExtractor = (treatment) => {
      let secondary = '';
      if (treatment.dose != null){
        secondary = secondary.concat(treatment.dose.toString());
        if (treatment.doseUnit != '' && treatment.doseUnit != null){
          secondary = secondary.concat(treatment.doseUnit);
        }
      }
      return [treatment.name, secondary];
    }

    return (
        /*list content*/
        <SafeAreaView style={GlobalStyle.container}>
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
                    <TreatmentForm addTreatments={addTreatments} />
                </View>
            </Modal>
            <ListTemplate listItems={treatments} textExtractor={textExtractor} />
            <TouchableOpacity
                onPress={() => { setModalOpen(true) }}
                style={GlobalStyle.addButton}
            >
             <Text style={GlobalStyle.addButtonText}>Add Treatment</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
