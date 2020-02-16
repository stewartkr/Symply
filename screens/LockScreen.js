import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { GlobalStyle, GlobalColors } from '../assets/GlobalStyle';

const LocalStyle = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%'
  },

  pinContainer: {
    alignContent: 'center',
    margin: '12%',    
    backgroundColor: GlobalColors.pinContainerBG
  },

  pinTextInput: {
    backgroundColor: GlobalColors.softWhite,
    margin: '10%'
  },

  circle: {
    borderColor: GlobalColors.circleColor,
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 5
  }
})

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
    return (
      <KeyboardAvoidingView style={GlobalStyle.container}>
        <View style={[LocalStyle.circle, LocalStyle.logoContainer]}>
          <Text style={[GlobalStyle.titleText, {marginTop: '40%'}]}>
            Symply
          </Text>
        </View>
        <View style={LocalStyle.pinContainer}>
          <Text style={[GlobalStyle.text, {fontSize: 40, textAlign: 'center', marginTop: '2%'}]}>
            Enter PIN to{'\n'}unlock
          </Text>
          <View style={LocalStyle.pinTextInput}>
            <TextInput
              style={[GlobalStyle.text, {marginLeft: '4%'}]}
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
      </KeyboardAvoidingView>
    )
  }
}