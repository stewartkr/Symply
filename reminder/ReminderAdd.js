import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {GlobalStyle, GlobalColors} from '../assets/GlobalStyle';

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: GlobalColors.softWhite,
    width: '96%',
  },
});

const inputBox = (placeholder, onChangeText) => {
  return (
    <View style={styles.inputContainer}>
        <TextInput
          style={GlobalStyle.textInputBox}
          placeholder={placeholder}
          onChangeText={text => onChangeText(text)}
        />
    </View>
  );
};

export default function ReminderAdd({setVisible, inputHandler}) {
  const [currentInput, setInput] = useState({
    text: '',
    schedule: '',
  });

  return (
    <View style={GlobalStyle.formContainer}>
      <Text style={GlobalStyle.formName}>Add a Reminder</Text>
      {inputBox('Enter reminder text', text => {
        setInput(prevInput => ({
          text: text,
          schedule: prevInput.schedule,
        }));
      })}
      {inputBox('Enter schedule (as cron string)', text => {
        setInput(prevInput => ({
          text: prevInput.text,
          schedule: text,
        }));
      })}
      <TouchableOpacity
        style={GlobalStyle.addButton}
        onPress={() => {
          if (currentInput.text !== '' && currentInput.schedule !== '') {
            inputHandler(currentInput);
            setVisible(false);
          }
        }}
      >
        <Text style={GlobalStyle.addButtonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={GlobalStyle.addButton} onPress={() => setVisible(false)}>
        <Text style={GlobalStyle.addButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}
