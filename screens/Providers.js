import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { GlobalColors, GlobalStyle } from '../assets/GlobalStyle';
import ListTemplate from '../list-template/ListTemplate';
import ProviderForm from "../form_components/ProviderForm";

import { defaultOpenParams } from '../realm/DatabaseConfig';

const Realm = require('realm');

export default function Providers() {
    
    const [modalOpen, setModalOpen] = useState(false);
    const [providers, setProviders] = useState(null);
    const [realm, setRealm] = useState(null);

    const listener = (r) => {
      let snap = r.objects('Provider').snapshot();
      let array = Object.keys(snap).map(key => snap[key]);
      if(providers != snap){
        console.log('Update Providers');
        setProviders(array);
      }
    }

    const listenerName = 'change';

    useEffect(() => {
        Realm.open(defaultOpenParams).then(realm => {
            setRealm(realm);
            let snap = realm.objects('Provider').snapshot();
            let array = Object.keys(snap).map(key => snap[key]);
            setProviders(array);
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

    const addProvider = (providers) => {
        realm.write(() => {
            const new_provider = realm.create('Provider', {
                firstName: providers.firstN,
                lastName: providers.lastN,
                address: providers.address,
                occupation: providers.occupation
            });
        });
        setModalOpen(false);
    }

    // return an array, index 0 is Name, index 1 is secondary info
    const textExtractor = (provider) => {
      let primary = provider.firstName + " " + provider.lastName;
      let secondary = '';
      if (provider.occupation != null){
        secondary = secondary.concat(provider.occupation);
      }
      return [primary, secondary];
    }

    return (
        <View style={{ flex: 1, backgroundColor: GlobalColors.backgroundColor }}>
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
                    <ProviderForm addProvider={addProvider} />
                </View>
            </Modal>
            <ListTemplate listItems={providers} textExtractor={textExtractor}/>
            <TouchableOpacity
              onPress={() => { setModalOpen(true) }}
              style={GlobalStyle.addButton}
            >
              <Text style={GlobalStyle.addButtonText}> Add Provider</Text>
            </TouchableOpacity>
        </View>
    );
}