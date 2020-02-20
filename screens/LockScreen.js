import React, { useState, Component }      from 'react';
import { View, Text, TextInput,
        StyleSheet, KeyboardAvoidingView } from 'react-native';
import AsyncStorage                        from '@react-native-community/async-storage';

import { GlobalStyle, GlobalColors }       from '../assets/GlobalStyle';

const NAV_TO = 'Main';

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

export default function LockScreen({ navigation }) {

  /* 
    state = {
      pin - string representing user's pin
    }
  */

  let pin = null;

  const [userInput, setUserInput] = useState('');
  const userInputChangeHandler = (val) => {
    setUserInput(val);
    // at each entry change, re-eval whether we hit the correct pin
    if(userInput === pin) {
      console.log("correct pin");
      navigation.navigate(NAV_TO);
    } else {
      console.log("incorrect pin");
    }
  }

  AsyncStorage.getItem('@pin')
  .then((result) => {
    pin = result;
    if(pin === null) {
      console.log("no pin");
      navigation.navigate(NAV_TO);
    };
  })

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
            onChangeText={userInputChangeHandler}
            placeholder="PIN"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}