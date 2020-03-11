import React from 'react';
import { View, TextInput, KeyboardAvoidingView, Picker, TouchableOpacity, Text} from 'react-native';
import { GlobalStyle } from '../assets/GlobalStyle';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';

function AppointmentForm({ addAppoint }){

  return(
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <View style={GlobalStyle.formContainer}>
          <Text style={GlobalStyle.formName}> New Appointment Information </Text>
          
          <Formik
            initialValues = {{provider:'', time:'', notes:''}}
            onSubmit = {(values, actions) => {
                console.log(values.provider);
                values.time = new Date();
                actions.resetForm();
                addAppoint(values);
            }}
          >
            {(formProps) => (
              <View>
                <TextInput 
                  style={GlobalStyle.textInputBox}
                  placeholder='Appointment With'
                  //two way data binding
                  onChangeText={formProps.handleChange('text')}
                  value={formProps.values.text}
                />

                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='Date'
                  //two way data binding
                  onChangeText={formProps.handleChange('time')}
                  value={formProps.values.time}
                /> 

                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='Time'
                  //two way data binding
                  onChangeText={formProps.handleChange('notes')}
                  value={formProps.values.notes}
                />  

                <TouchableOpacity
                  onPress={formProps.handleSubmit}
                  style={GlobalStyle.addButton}
                >
                  <Text style={GlobalStyle.addButtonText}>Add Appointment</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AppointmentForm;