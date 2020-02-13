import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// NOTE: ONLY USE UNTIL NAVIGATION IS SET UP
import LockScreen from './screens/LockScreen';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <LockScreen/>
      </NavigationContainer>
    );
  }
}
