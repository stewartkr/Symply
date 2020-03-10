import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import ListTemplate from '../list-template/ListTemplate';
import TopBar from '../navigation/TopBar';
import { GlobalColors } from '../assets/GlobalStyle';

import { defaultOpenParams } from '../realm/DatabaseConfig';

const Realm = require('realm');


export function LogScreen() {

  const [symptoms, setSymptoms] = useState([]);
  // TODO: Add symptomform :) (sb)
  const [realm, setRealm] = useState(null);

  const listener = (r) => {
    if(treatments != r.objects('Symptom').snapshot()){
      console.log('Update Symptoms');
      console.log(r.objects('Symptom').snapshot());
      setSymptoms(r.objects('Symptom').snapshot());
    }
  }

  const listenerName = 'change';

  useEffect(() => {
    Realm.open(defaultOpenParams).then(realm => {
        console.log('opened realm in LogScreen');
        setRealm(realm);
        setSymptoms(realm.objects('Symptom').snapshot());
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
    <View style={{flex: 1, backgroundColor:GlobalColors.backgroundColor}}>
      <TopBar pageName='Log' />
      <ListTemplate listItems={symptoms} textExtractor={textExtractor}/>
    </View>
  );
}
