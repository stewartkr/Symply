import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
/*Joey added*/
import {StackNavigator} from 'react-navigation';
import React, { Component } from 'react';
import {StyleSheet } from 'react-native';

import Profile from '../screens/Profile';
import Treatments from '../screens/Treatments';
import Providers from '../screens/Providers';
import Preferences from '../screens/Preferences';

const Stack = createStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name='Profile' component={Profile} options={{ title: 'Profile' }} />
          <Stack.Screen name='Treatments' component={Treatments} options={{ title: 'Treatments' }} />
          <Stack.Screen name="Providers" component={Providers} options={{ title: 'Providers' }} />
          <Stack.Screen name="Preferences" component={Preferences} options={{ title: 'Preferences' }} />
        </Stack.Navigator>
    );
}
