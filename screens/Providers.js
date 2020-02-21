import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Text } from 'react-native';
import { grey } from 'color-name';
import ListTemplate from '../list-template/ListTemplate';


const providers = [
  {text: "Dr. Oz", key: '2'},
  {text: 'Dr. Phil', key: '3'},
  {text: 'Dr. Drew', key: '3'}
];

export default function Providers() {
    return (
        /*list content*/
        <View style={styles.container}>
            {/* form*/}
            <ListTemplate listItems={providers}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9bcdd5",
        alignItems: 'center',
        justifyContent: 'center'
    }
});
