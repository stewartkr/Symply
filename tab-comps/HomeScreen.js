import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../navigation/TopBar'
import ProviderScreen from '../screens/ProviderScreen'


export function HomeScreen() {
    return (
        <View style={{flex: 1}}>
          <TopBar pageName='Home' />
        </View>

    );
}
