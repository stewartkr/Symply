import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button, Text, Modal, TouchableOpacity } from 'react-native';
import { grey } from 'color-name';
import ListTemplate from '../list-template/ListTemplate';
import TreatmentForm from '../form_components/TreatmentForm';

import { allSchemas, defaultOpenParams } from '../realm/DatabaseConfig';

const Realm = require('realm');

export default function Treatments() {

    const [treatments, setTreatments] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [realm, setRealm] = useState(null);

    useEffect(() => {
        Realm.open(defaultOpenParams).then(realm => {
            console.log('opened realm in Treatments');
            setRealm(realm);
            setTreatments(realm.objects('Treatment'));
        });

        return () => {
            if (realm !== null && !realm.isClosed) {
                console.log('closed realm');
                realm.close();
            }
        };
    }, []);
    
    //replace this with writing to the database functionality
    const addTreatments = (treatments) => {
        console.log(treatments.name);
        const dosageVal = parseInt(treatments.dose,10);
        realm.write(() => {
            newTreatment = realm.create('Treatment', {
            name: treatments.name, 
            medication: false, 
            dose: dosageVal, 
            doseUnit: treatments.doseUnit, 
            });
        });
        setModalOpen(false);
    }

    return (
        /*list content*/
        <View style={styles.container}>
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
                    <TreatmentForm addTreatments={addTreatments} />
                </View>
            </Modal>
            <ListTemplate listItems={treatments} />
            <TouchableOpacity
                onPress={() => { setModalOpen(true) }}
                style={styles.addButton}
            >
             <Text>Add Treatment</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9bcdd5"
    },
    addButton: {
        backgroundColor: 'white',
        padding: 10,
        width: 117,
        marginBottom: 10,
        left: 10,
        borderRadius: 10
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
