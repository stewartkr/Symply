import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
/*Joey added*/
import {StackNavigator} from 'react-navigation';
import React, { Component } from 'react';
import {StyleSheet, View } from 'react-native';

import Profile from '../screens/Profile';
import Treatments from '../screens/Treatments';
import Providers from '../screens/Providers';
import Preferences from '../screens/Preferences';
import BottomBar from '../navigation/BottomBar';

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

const styles = StyleSheet.create({
  pageContainer:{
   flex:1,
   justifyContent:'center'
  }
})
