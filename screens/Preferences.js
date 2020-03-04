import React, { useState, useEffect } from 'react';
import { StyleSheet, View, 
          ActivityIndicator, Button, 
          Text, TextInput }           from 'react-native';
import Overlay                        from 'react-native-modal-overlay';
import AsyncStorage                   from '@react-native-community/async-storage';

export default function Providers() {
  const [prevPin, setPrevPin] = useState(null);
  const [pinLoaded, setPinLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // control overlay visibility
  
  // use state to store overlay element values
  const [verifyingPin, setVPin] = useState(null);
  const [newPin1, setNewPin1] = useState(null);
  const [newPin2, setNewPin2] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('@pin')
    .then((result) => {
      setPrevPin(result);
      setPinLoaded(true);
    })
  })

  function confirmNewPin() {
    // if verifyingPin doesn't match prevPin, display error
    if(prevPin != verifyingPin){
      setError("Error: Previous PIN field does not match existing PIN.");
    } else if(newPin1 != newPin2) {
      setError("Error: New PIN fields do not match.");
    } else {
      // set new PIN
      if(newPin1 == null){
        // if user left new pin fields empty, assume they want to disable pin
        AsyncStorage.removeItem('@pin');
      } else {
        AsyncStorage.setItem('@pin', newPin1);
      }
      
      // reset modal elements
      setVPin(null);
      setNewPin1(null);
      setNewPin2(null);
      setError(null);
      setModalVisible(false);
    }
  }

  // if pin is loaded and non-null, ask user to verify pin before resetting
  // if pin is loaded and null, reset pin
  // if pin is not loaded, show a loading widget
  return (
      /*list content*/
      <View style={styles.container}>
          {/* form*/}
          <Text>Preferences</Text>
          <Button
            title="Set PIN"
            onPress={() => { setModalVisible(true) }}
          />
          <Overlay visible={modalVisible}>
            {!pinLoaded ? <ActivityIndicator size="small"/> : <View/>}
            {pinLoaded && (prevPin != null) ? 
              <TextInput
                placeholder='Enter Previous PIN'
                onChangeText={text => setVPin(text)}
                secureTextEntry={true}
              />
              : <View/>}
            {pinLoaded ? 
              <View>
                <TextInput
                  placeholder='Enter New PIN'
                  onChangeText={text => setNewPin1(text)}
                  secureTextEntry={true}
                />
                <TextInput
                  placeholder='Re-enter New PIN'
                  onChangeText={text => setNewPin2(text)}
                  secureTextEntry={true}
                />
                <Button
                  title="Submit"
                  onPress={() => confirmNewPin() }
                />
              </View>
              : <View/>}
              {error != null ? 
                <Text style={{color: 'red'}}>{error}</Text>
                : <View/>}
          </Overlay>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9bcdd5",
        alignItems: 'center',
        justifyContent: 'center'
    }
});
