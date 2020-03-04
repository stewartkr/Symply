import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Text, Modal, TouchableOpacity } from 'react-native';
import { grey } from 'color-name';
import { GlobalColors } from '../assets/GlobalStyle';
import ListTemplate from '../list-template/ListTemplate';
import ProviderForm from "../form_components/ProviderForm";

export default function Providers() {
    
    const [modalOpen, setModalOpen] = useState(false);

    const [providers, setProvider] = useState([
        { text: "Dr. Oz", field: 'phony', address: 'fakersvile', primary_contact: '555-555-5555', key: '1' },
        { text: 'Dr. Phil', field: 'phony', address: 'fakersvile', primary_contact: '555-555-5555', key: '2' },
        { text: 'Dr. Drew', field: 'phony', address: 'fakersvile', primary_contact: '555-555-5555', key: '3' }
    ]);

    //find better way of generating new key
    const addProvider = (providers) => {
        providers.key = Math.random().toString();
        setProvider((nextProvider) => {
            return [providers, ...nextProvider];
        })
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
                        style={{ marginTop: 50, alignSelf: 'flex-end' }}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <ProviderForm addProvider={addProvider} />
                </View>
            </Modal>
            <ListTemplate listItems={providers}/>
            <TouchableOpacity
                onPress={() => { setModalOpen(true) }}
            >
                <Text>Add Provider</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9bcdd5",
    }
});
