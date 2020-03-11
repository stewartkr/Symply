import React, { useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar';
import { GlobalColors, GlobalStyle } from '../assets/GlobalStyle';

import { defaultOpenParams } from '../realm/DatabaseConfig';

const Realm = require('realm');


export function LogScreen() {

  const [symptoms, setSymptoms] = useState([]);
  // TODO: Add symptomform :) (sb)
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

  // return an array, index 0 is Name, index 1 is secondary info
  const textExtractor = (symptom) => {
    let primary = symptom.name;
    let secondary = '';
    return [primary, secondary];
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1, backgroundColor:GlobalColors.backgroundColor}}>
        <TopBar pageName='Log' />
        <ListTemplate listItems={symptoms} textExtractor={textExtractor}/>
      </View>
    </SafeAreaView>
  );
}
