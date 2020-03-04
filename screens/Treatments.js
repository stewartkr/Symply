import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Text, Modal, TouchableOpacity } from 'react-native';
import { grey } from 'color-name';
import ListTemplate from '../list-template/ListTemplate';
import TreatmentForm from '../form_components/TreatmentForm'


export default function Treatments() {
    const [treatments, setTreatments] = useState([
        { text: 'Accapulco Gold', frequency: '', dosage: '', key: '1' },
        { text: 'Smiling Buddha', frequency: '', dosage: '',key: '2' },
        { text: 'Super Lemon Haze', frequency: '', dosage: '',key: '3' }
    ]);
   
    const [modalOpen, setModalOpen] = useState(false);

    const addTreatments = (treatments) => {
        treatments.key = Math.random().toString();
        setTreatments((nextTreatment) => {
            return [treatments, ...nextTreatment];
        })
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
                        style={{ marginTop: 50, alignSelf: 'flex-end' }}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <TreatmentForm addTreatments={addTreatments} />
                </View>
            </Modal>
            <ListTemplate listItems={treatments} />
            <TouchableOpacity
                onPress={() => { setModalOpen(true) }}
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
    }
});
