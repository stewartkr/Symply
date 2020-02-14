import { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { GlobalStyle } from '../assets/GlobalStyle';

export default class LockScreen extends Component {

  /* 
    state = {
      isLoading  - boolean to indicate whether all resources are loaded
      pin        - string representing user's pin
    }
   */
  componentDidMount() {
    this.setState({ isLoading: true });
    AsyncStorage.getItem('@pin')
    .then((pin) => {
      this.setState({ pin, isLoading: false });
    })
    // TODO: Navigate directly to HomeScreen if @pin is null, i.e. if lockscreen is unset
  }
  onSave(userInput) {
    if (userInput == this.state.pin) {
      // TODO: Navigate to HomeScreen
      console.log("correct pin");
    } else {
      console.log("incorrect pin");
    }
  }

  render() {
    <View style={GlobalStyle.container}>
      <View style={GlobalStyle.circle}>
        <Text style={GlobalStyle.titleText}>
          Symple
        </Text>
      </View>
      <View style={GlobalStyle.pinContainer}>
        <Text style={GlobalStyle.text}>
          Enter PIN to unlock
        </Text>
        <TextInput
          style={GlobalStyle.pinTextInput}
          title="Pin"
          secureTextEntry={true}
          onChangeText={
            (value) => {
              // at each entry change, re-eval whether we hit the correct pin
              this.onSave(value);
            }
          }
          placeholder="PIN"
        />
      </View>
    </View>
  }
}