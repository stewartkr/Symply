import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
const Realm = require('realm');

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <View>
          <Text>Hello, world!</Text>
        </View>
      </NavigationContainer>
    );
  }
}
