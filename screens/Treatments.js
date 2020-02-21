import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Text } from 'react-native';
import { grey } from 'color-name';
import ListTemplate from '../list-template/ListTemplate';


const treatments = [
  {text:'Accapulco Gold', key:'1'},
  {text: 'Smiling Buddha', key: '2'},
  {text: 'Super Lemon Haze', key: '3'}
];


export default function Treatments() {
    return (
        /*list content*/
        <View style={styles.container}>
            {/* form*/}
        <ListTemplate listItems={treatments} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9bcdd5"
    }
});
