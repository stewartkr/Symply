import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator'; 
const Realm = require('realm');

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    );
  }
}