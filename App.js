import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator'; 
const Realm = require('realm');

// // import BottomBar from './BottomBar'
// import List from "./List";
// import BottomBar from "./navigation/BottomBar"

// // NOTE: ONLY USE UNTIL NAVIGATION IS SET UP
// import LockScreen from './screens/LockScreen';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    );
  }
}