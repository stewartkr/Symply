import * as React from 'react';
import { Text, View } from 'react-native';
import { DEBUG } from '../debug/debugStatus';
import TestRealmButtons from '../debug/TestRealmButtons';

export function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
            {DEBUG ? <TestRealmButtons/> : <View/>}
        </View>
    );
}