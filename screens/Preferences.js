import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Text } from 'react-native';
import { grey } from 'color-name';


export default function Providers() {
    return (
        /*list content*/
        <View style={styles.container}>
            {/* form*/}
            <Text>Preferences</Text>
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
