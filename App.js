import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
const Realm = require('realm');

// import BottomBar from './BottomBar'
import List from "./List";
import BottomBar from "./BottomBar"

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomBar />
      </NavigationContainer>
    );
  }
}