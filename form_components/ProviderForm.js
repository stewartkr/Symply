import React from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { GlobalStyle } from '../assets/GlobalStyle';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';


function ProviderForm({ addProvider }) {

  return (
    <KeyboardAvoidingView behavior="padding">  
      <ScrollView>
        <View style={GlobalStyle.formContainer}>
          <Text style={GlobalStyle.formName}> New Provider Information </Text>
          
          <Formik
            enableReinitialize
            // rest of props for treatment form; , frequency:'', dosage:''
            initialValues={{firstN: '', lastN:'', address:'', occupation:'' }}
            onSubmit={(values, actions) => {
              actions.resetForm();
              addProvider(values);
            }}
          >
            {(formProps) => (
              <View>
                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='First Name'
                  //two way data binding
                  onChangeText={formProps.handleChange('firstN')}
                  value={formProps.values.text}
                />

                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='Last Name'
                  //two way data binding
                  onChangeText={formProps.handleChange('lastN')}
                  value={formProps.values.field}
                />

                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='Address (If applicable)'
                  //two way data binding
                  onChangeText={formProps.handleChange('address')}
                  value={formProps.values.address}
                />

                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='Occupation/Specialty'
                  //two way data binding
                  onChangeText={formProps.handleChange('occupation')}
                  value={formProps.values.primary_contact}
                />

                <TouchableOpacity
                  onPress={formProps.handleSubmit}
                  style={GlobalStyle.addButton}
                >
                  <Text style={GlobalStyle.addButtonText}>Add Provider</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ProviderForm;