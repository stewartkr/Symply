import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button, Text, Modal, TouchableOpacity } from 'react-native';
import { grey } from 'color-name';
import { GlobalColors } from '../assets/GlobalStyle';
import ListTemplate from '../list-template/ListTemplate';
import ProviderForm from "../form_components/ProviderForm";

import { allSchemas, defaultOpenParams } from '../realm/DatabaseConfig';

const Realm = require('realm');

export default function Providers() {
    
    const [modalOpen, setModalOpen] = useState(false);
    const [providers, setProvider] = useState(null);
    const [realm, setRealm] = useState(null);

    useEffect(() => {
        Realm.open(defaultOpenParams).then(realm => {
            console.log('opened realm in Providers');
            setRealm(realm);
            setProvider(realm.objects('Provider'));
        });

        return () => {
            if (realm !== null && !realm.isClosed) {
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

    return (
        <View style={{ flex: 1, backgroundColor: GlobalColors.backgroundColor }}>
            <Modal
                visible={modalOpen}
                animationType='slide'
            >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => { setModalOpen(false) }}
                        style={styles.backButton}
                    >
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>Back</Text>
                    </TouchableOpacity>
                    <ProviderForm addProvider={addProvider} />
                </View>
            </Modal>
            <ListTemplate listItems={providers}/>
            <TouchableOpacity
                onPress={() => { setModalOpen(true) }}
                style={styles.addButton}
            >
                <Text> Add Provider</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9bcdd5",
    },
    addButton: {
        backgroundColor: 'white',
        padding: 10,
        width: 110,
        marginBottom: 10,
        borderRadius: 10,
        left:10
    },
    backButton: {
        marginTop: 50,
        alignSelf: 'flex-end',
        width: 55,
        height: 35,
        paddingTop: 5,
        fontSize: 100,
        borderRadius: 5,
        right: 1
    }
});
